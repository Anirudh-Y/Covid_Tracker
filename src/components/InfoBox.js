import React from 'react'
import { Card, CardContent, Typography } from "@mui/material"

function InfoBox({ title, number, total }) {
    return (
        <div>
            <Card className="infoBox">
                <CardContent>
                    {/* Title */}
                    <Typography className="infoBox_title" color="textScondary">
                        {title}
                    </Typography>
                    {/* + Numbers of cases recovers or deaths */}
                    <h2 className="infoBox_number">
                        {number}
                    </h2>
                    {/* Total numbers */}
                    <Typography className="infoBox_total" color="textSecondary">
                        {total}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;
