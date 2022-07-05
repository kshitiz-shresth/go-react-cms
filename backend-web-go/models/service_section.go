package models

import (
	"time"
)

type ServiceSection struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	Title       string    `gorm:"type:text" json:"assignedTo"`
	Description string    `gorm:"type:mediumText" json:"task"`
	Order       int16     `json:"order"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}
