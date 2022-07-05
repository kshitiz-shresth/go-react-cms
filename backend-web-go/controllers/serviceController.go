package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
)

type CreateServiceInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Order       int16  `json:"order"`
}

type UpdateServiceInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Order       int16  `json:"order"`
}

func CreateService(c *gin.Context) {
	service := new(CreateServiceInput)
	if err := c.ShouldBindJSON(service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	serviceSection := models.ServiceSection{Title: service.Title, Description: service.Description, Order: service.Order}
	db := c.MustGet("db").(*gorm.DB)
	db.Create(&serviceSection)
	c.JSON(http.StatusOK, gin.H{"data": serviceSection})
}

func GetAllServices(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var services []models.ServiceSection
	db.Order("`order` asc").Find(&services)
	c.JSON(http.StatusOK, gin.H{"data": services})
}
