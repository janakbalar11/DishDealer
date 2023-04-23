import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// reuse this function
import { RestaurantMapping } from "./RestaurantMapping";

const serverAddress = "http://localhost:3002";

export function Search() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    axios
      .post(`${serverAddress}/search`, {
        searchText: searchQuery,
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data);
        setHasSearched(true);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="Restaurant Name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          sx={{
            width: "100%",
            padding: "0.5em",
          }}
          variant="outlined"
        />
        <IconButton
          variant="contained"
          onClick={() => handleSearch()}
          color="primary"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Button onClick={() => navigate("/restaurant")}>Add Restaurant</Button>

      <Box
        sx={{
          margin: "auto 4%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!hasSearched ? (
          <Typography variant="body" style={{ fontFamily: "Roboto" }}>
            Please enter a search to see results!
          </Typography>
        ) : searchResults.length === 0 ? (
          <Typography variant="body">
            Please enter a search to see results!
          </Typography>
        ) : (
          searchResults.map((searchResult) => {
            return RestaurantMapping(searchResult, navigate);
          })
        )}
      </Box>
    </Box>
  );
}
