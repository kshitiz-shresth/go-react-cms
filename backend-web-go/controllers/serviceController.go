package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
)

type CreateServiceInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	Order       int16  `json:"order"`
}

type UpdateServiceInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Order       int16  `json:"order"`
}

type DragServiceBody struct {
	SourceIndex      int16 `json:"sourceIndex"`
	DestinationIndex int16 `json:"destinationIndex"`
}

func DragService(c *gin.Context) {
	id := c.Param("id")
	db := c.MustGet("db").(*gorm.DB)

	var serviceToBeUpdated models.ServiceSection
	if db.Where("id = ?", id).First(&serviceToBeUpdated).RecordNotFound() {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No Service Found"})
		return
	}

	var dragServiceBody DragServiceBody
	if err := c.ShouldBindJSON(&dragServiceBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var getAllServices []models.ServiceSection
	db.Order("`order` asc").Find(&getAllServices)
	var previousIssueOrder float32
	var nextIssueOrder float32
	var currentOrder float32

	if dragServiceBody.DestinationIndex > dragServiceBody.SourceIndex {
		previousIssueOrder = float32(getAllServices[dragServiceBody.DestinationIndex].Order)
		if dragServiceBody.DestinationIndex+1 > int16(len(getAllServices))-1 {
			nextIssueOrder = -0.01
		} else {
			nextIssueOrder = float32(getAllServices[dragServiceBody.DestinationIndex+1].Order)
		}
	} else {
		nextIssueOrder = float32(getAllServices[dragServiceBody.DestinationIndex].Order)
		if dragServiceBody.DestinationIndex-1 < 0 {
			previousIssueOrder = -0.01
		} else {
			previousIssueOrder = float32(getAllServices[dragServiceBody.DestinationIndex-1].Order)
		}
	}

	if previousIssueOrder == -0.01 {
		currentOrder = nextIssueOrder - 512
	} else if nextIssueOrder == -0.01 {
		currentOrder = previousIssueOrder + 512
	} else {
		currentOrder = (nextIssueOrder + previousIssueOrder) / 2
	}

	serviceToBeUpdated.Order = int16(currentOrder)
	db.Model(&serviceToBeUpdated).Updates(serviceToBeUpdated)

	c.JSON(http.StatusOK, gin.H{
		"data":    serviceToBeUpdated,
		"message": "Dragged Successfully",
	})

}

func CreateService(c *gin.Context) {
	service := new(CreateServiceInput)
	if err := c.ShouldBindJSON(service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := c.MustGet("db").(*gorm.DB)
	serviceSection := models.ServiceSection{Title: service.Title, Description: service.Description, Order: service.Order}

	highestOrderSection := new(models.ServiceSection)
	var order int16
	inst := db.Order("`order` desc").First(highestOrderSection)
	if !inst.RecordNotFound() {
		order = highestOrderSection.Order + 512
	} else {
		order = 512
	}
	serviceSection.Order = order
	db.Create(&serviceSection)
	c.JSON(http.StatusOK, gin.H{"data": serviceSection})
}

func GetAllServices(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var services []models.ServiceSection
	db.Order("`order` asc").Find(&services)
	c.JSON(http.StatusOK, gin.H{"data": services})
}

func UpdateServices(c *gin.Context) {
	id := c.Param("id")
	db := c.MustGet("db").(*gorm.DB)

	var inputData UpdateServiceInput
	if err := c.ShouldBindJSON(&inputData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var serviceToBeUpdated models.ServiceSection
	if err := db.Where("id = ?", id).First(&serviceToBeUpdated).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Model(&serviceToBeUpdated).Updates(&inputData)
	c.JSON(http.StatusOK, serviceToBeUpdated)
	// c.String(http.StatusOK, c.Param("id"))
}
