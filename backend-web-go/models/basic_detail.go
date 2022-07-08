package models

import "time"

type BasicDetail struct {
	ID               uint      `json:"id" gorm:"primary_key"`
	LogoImage        string    `json:"logo_image" gorm:"type:varchar(100)"`
	JpxImage         string    `json:"jpx_image" gorm:"type:varchar(100)"`
	ScalaImage       string    `json:"scala_image" gorm:"type:varchar(100)"`
	BannerImage      string    `json:"banner_image" gorm:"type:varchar(100)"`
	TopFirst         string    `json:"top_first" gorm:"type:text"`
	TopSecond        string    `json:"top_second" gorm:"type:text"`
	TopThird         string    `json:"top_third" gorm:"type:mediumText"`
	DevSystemImage   string    `json:"dev_system_image" gorm:"type:varchar(100)"`
	CasesImage       string    `json:"cases_image" gorm:"type:varchar(100)"`
	TeamImage        string    `json:"team_image" gorm:"type:varchar(100)"`
	FlowDiagramImage string    `json:"flow_diagram_image" gorm:"type:varchar(100)"`
	StepsImage       string    `json:"step_image" gorm:"type:varchar(100)"`
	CreatedAt        time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt        time.Time `json:"updated_at" gorm:"default:CURRENT_TIMESTAMP"`
}
