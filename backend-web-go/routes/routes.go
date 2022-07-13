package routes

import (
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/controllers"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})
	r.Static("/assets", "./public/assets")
	r.Static("/uploaded", "./public/uploaded")
	r.LoadHTMLGlob("./public/*.html")
	r.GET("/", controllers.Index)

	r.POST("/services", controllers.CreateService)
	r.GET("/services", controllers.GetAllServices)
	r.PUT("/services/:id", controllers.UpdateServices)
	r.POST("/service/drag/:id", controllers.DragService)
	r.DELETE("/services/:id", controllers.DeleteService)

	r.POST("/providers", controllers.CreateProvider)
	r.GET("/providers", controllers.GetAllProviders)
	r.PUT("/providers/:id", controllers.UpdateProviders)
	r.POST("/provider/drag/:id", controllers.DragProvider)
	r.DELETE("/providers/:id", controllers.DeleteProvider)

	r.POST("/basic-details", controllers.SaveBasicDetail)
	r.GET("/basic-details", controllers.GetBasicDetail)

	return r
}
