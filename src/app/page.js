"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Grid } from "@mui/material";
export default function Home() {
  const [getData, setGetData] = useState([]);
  const fetchData = async () => {
    try {
      const respone = await fetch("https://fakestoreapi.com/products/", {
        method: "get",
      });
      const data = await respone.json();
      setGetData(data);
      console.log(data, "response");
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {getData &&
              getData?.map((item, i) => (
                <Grid item xs={3}>
                  <Card
                    key={i}
                    sx={{
                      width: 280,
                      boxShadow:
                        "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
                      border: "1px solid #e9eaee",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <CardMedia>
                        <img
                          src={item?.image}
                          alt={item?.title}
                          width={254}
                          height={230}
                        />
                      </CardMedia>
                      <CardContent>
                        {/* {type && (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
              </Typography>
            )} */}
                        <Link href={`/book/`}>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ cursor: "pointer" }}
                          >
                            {item?.title}
                          </Typography>
                        </Link>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {/* {authors.map((author) => author.author.name).join(`, `)} */}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                          <Rating
                            name="half-rating-read"
                            precision={item?.rating?.rate}
                            value={item?.rating?.count}
                            size="size-medium"
                            sx={{ color: "yellow" }}
                            readOnly
                          />
                          <Typography
                            component="div"
                            variant="body2"
                            sx={{ color: "#616161" }}
                          >
                            {item?.rating?.count}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                    <CardActions>
                      <IconButton
                        aria-label="add to cart"
                      // disabled={stock <= 0}
                      // onClick={() => {
                      //   addItem();
                      // }}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                      <Typography
                        variant="h5"
                        sx={{ marginLeft: "auto", marginRight: "8px" }}
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ paddingRight: 0.5 }}
                        >
                          $
                        </Typography>
                        {item?.price}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
