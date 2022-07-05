package main

import (
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/models"
	"github.com/kshitiz-shresth/go-react-cms/backend-web-go/routes"
)

func main() {

	db := models.SetupDB()
	db.AutoMigrate(&models.Task{}, &models.ServiceSection{})

	r := routes.SetupRoutes(db)
	r.Run()
}
