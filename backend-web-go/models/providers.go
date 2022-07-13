package models

import "time"

type Provider struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Title     string    `json:"title" gorm:"type:text"`
	Image     string    `json:"image" gorm:"type:varchar(8)"`
	Order     int       `json:"order" gorm:"type:integer"`
	CreatedAt time.Time `json:"created_at" gorm:"default.CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `json:"updated_at" gorm:"default.CURRENT_TIMESTAMP"`
}
