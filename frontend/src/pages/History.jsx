import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, IconButton } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

const History = () => {
  const { getHistoryOfUser } = React.useContext(AuthContext);

  const [meetings, setMeetings] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getHistoryOfUser().then((data) => {
      console.log(data);
      setMeetings(data);
    });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton
          onClick={() => navigate("/home")}
          color="primary"
          aria-label="History"
          component="span"
        >
          <HomeIcon />
        </IconButton>
        <h2>History</h2>
      </div>

      <ul>
        { meetings && meetings.map((meeting) => (
          <Card variant="outlined" key={meeting._id}>
            {" "}
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Date: {new Date(meeting.date).toLocaleString()}
              </Typography>
              <Typography variant="h5" component="div">
                Code: {meeting.meetingCode}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default History;
