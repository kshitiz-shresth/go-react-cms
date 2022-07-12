package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
)

func Index(c *gin.Context) {
	var services []models.ServiceSection
	var basicDetail models.BasicDetail
	db := c.MustGet("db").(*gorm.DB)
	db.Where("id = ?", 1).First(&basicDetail)
	db.Order("`order` asc").Find(&services)
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title":       "Ready To Work",
		"services":    services,
		"basicDetail": basicDetail,
	})
}
