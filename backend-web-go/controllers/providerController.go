package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
)

type CreateProviderInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Order       int16  `json:"order"`
}

type UpdateProviderInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Order       int16  `json:"order"`
}

type DragProviderBody struct {
	SourceIndex      int16 `json:"sourceIndex"`
	DestinationIndex int16 `json:"destinationIndex"`
}

func DragProvider(c *gin.Context) {
	id := c.Param("id")
	db := c.MustGet("db").(*gorm.DB)

	var providerToBeUpdated models.Provider
	if db.Where("id = ?", id).First(&providerToBeUpdated).RecordNotFound() {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No Provider Found"})
		return
	}

	var dragProviderBody DragProviderBody
	if err := c.ShouldBindJSON(&dragProviderBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var getAllProviders []models.Provider
	db.Order("`order` asc").Find(&getAllProviders)
	var previousProviderOrder float32
	var nextProviderOrder float32
	var currentOrder float32

	if dragProviderBody.DestinationIndex > dragProviderBody.SourceIndex {
		previousProviderOrder = float32(getAllProviders[dragProviderBody.DestinationIndex].Order)
		if dragProviderBody.DestinationIndex+1 > int16(len(getAllProviders))-1 {
			nextProviderOrder = -0.01
		} else {
			nextProviderOrder = float32(getAllProviders[dragProviderBody.DestinationIndex+1].Order)
		}
	} else {
		nextProviderOrder = float32(getAllProviders[dragProviderBody.DestinationIndex].Order)
		if dragProviderBody.DestinationIndex-1 < 0 {
			previousProviderOrder = -0.01
		} else {
			previousProviderOrder = float32(getAllProviders[dragProviderBody.DestinationIndex-1].Order)
		}
	}

	if previousProviderOrder == -0.01 {
		currentOrder = nextProviderOrder - 512
	} else if nextProviderOrder == -0.01 {
		currentOrder = previousProviderOrder + 512
	} else {
		currentOrder = (nextProviderOrder + previousProviderOrder) / 2
	}

	db.Model(&providerToBeUpdated).Updates(map[string]interface{}{"order": int16(currentOrder)})

	c.JSON(http.StatusOK, gin.H{
		"data":    providerToBeUpdated,
		"message": "Dragged Successfully",
	})

}

func CreateProvider(c *gin.Context) {
	provider := new(CreateProviderInput)
	if err := c.ShouldBindJSON(provider); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := c.MustGet("db").(*gorm.DB)
	providerSection := models.Provider{Title: provider.Title, Order: provider.Order}

	highestOrderSection := new(models.Provider)
	var order int16
	inst := db.Order("`order` desc").First(highestOrderSection)
	if !inst.RecordNotFound() {
		order = highestOrderSection.Order + 512
	} else {
		order = 512
	}
	providerSection.Order = order
	db.Create(&providerSection)
	c.JSON(http.StatusOK, gin.H{"data": providerSection})
}

func GetAllProviders(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var providers []models.Provider
	db.Order("`order` asc").Find(&providers)
	c.JSON(http.StatusOK, gin.H{"data": providers})
}

func UpdateProviders(c *gin.Context) {
	id := c.Param("id")
	db := c.MustGet("db").(*gorm.DB)

	var inputData UpdateProviderInput
	if err := c.ShouldBindJSON(&inputData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var providerToBeUpdated models.Provider
	if err := db.Where("id = ?", id).First(&providerToBeUpdated).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Model(&providerToBeUpdated).Updates(&inputData)
	c.JSON(http.StatusOK, providerToBeUpdated)
	// c.String(http.StatusOK, c.Param("id"))
}

func DeleteProvider(c *gin.Context) {
	// Get model if exist
	db := c.MustGet("db").(*gorm.DB)
	var provider models.Provider
	if err := db.Where("id = ?", c.Param("id")).First(&provider).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&provider)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
