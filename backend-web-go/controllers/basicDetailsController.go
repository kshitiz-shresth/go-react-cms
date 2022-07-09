package controllers

import (
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
)

func SaveBasicDetail(c *gin.Context) {
	logoImage, err := c.FormFile("logo_image")
	var basicDetail models.BasicDetail
	db := c.MustGet("db").(*gorm.DB)

	//logo_image
	if err == nil {
		extension := filepath.Ext(logoImage.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(logoImage, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.LogoImage = fileName
	}
	//jpx_image
	jpx_image, err := c.FormFile("jpx_image")
	if err == nil {
		extension := filepath.Ext(jpx_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(jpx_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.JpxImage = fileName
	}

	//scala_image
	scala_image, err := c.FormFile("scala_image")
	if err == nil {
		extension := filepath.Ext(scala_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(scala_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.ScalaImage = fileName
	}

	//banner_image
	banner_image, err := c.FormFile("banner_image")
	if err == nil {
		extension := filepath.Ext(banner_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(banner_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.BannerImage = fileName
	}

	basicDetail.TopFirst = c.Request.FormValue("top_first")
	basicDetail.TopSecond = c.Request.FormValue("top_second")
	basicDetail.TopThird = c.Request.FormValue("top_third")

	//dev_sytem_image
	dev_sytem_image, err := c.FormFile("dev_sytem_image")
	if err == nil {
		extension := filepath.Ext(dev_sytem_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(dev_sytem_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.DevSystemImage = fileName
	}

	var checkExistBasic models.BasicDetail
	if !db.Where("id = ?", 1).First(&checkExistBasic).RecordNotFound() {
		db.Model(checkExistBasic).Updates(&basicDetail)
	} else {
		db.Save(&basicDetail)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Success!"})
}
