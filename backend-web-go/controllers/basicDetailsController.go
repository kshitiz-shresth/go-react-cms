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

	//dev_system_image
	dev_system_image, err := c.FormFile("dev_system_image")
	if err == nil {
		extension := filepath.Ext(dev_system_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(dev_system_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.DevSystemImage = fileName
	}

	//cases_image
	cases_image, err := c.FormFile("cases_image")
	if err == nil {
		extension := filepath.Ext(cases_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(cases_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.CasesImage = fileName
	}

	//team_image
	team_image, err := c.FormFile("team_image")
	if err == nil {
		extension := filepath.Ext(team_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(team_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.TeamImage = fileName
	}

	//flow_diagram_image
	flow_diagram_image, err := c.FormFile("flow_diagram_image")
	if err == nil {
		extension := filepath.Ext(flow_diagram_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(flow_diagram_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.FlowDiagramImage = fileName
	}

	//step_image
	step_image, err := c.FormFile("step_image")
	if err == nil {
		extension := filepath.Ext(step_image.Filename)
		fileName := uuid.New().String() + extension
		if err := c.SaveUploadedFile(step_image, "./public/uploaded/"+fileName); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		basicDetail.StepsImage = fileName
	}

	var checkExistBasic models.BasicDetail
	if !db.Where("id = ?", 1).First(&checkExistBasic).RecordNotFound() {
		db.Model(checkExistBasic).Updates(&basicDetail)
	} else {
		db.Save(&basicDetail)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Success!"})
}

func GetBasicDetail(c *gin.Context) {
	var basicDetail models.BasicDetail
	db := c.MustGet("db").(*gorm.DB)
	if !db.Where("id = ?", 1).First(&basicDetail).RecordNotFound() {
		c.JSON(http.StatusOK, gin.H{"data": basicDetail, "message": "Fetched Successfully"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"data": basicDetail, "message": "Not Found"})
		return
	}
}
