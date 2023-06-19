import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type SuggestItemProps = {
  item: any;
};

export default function SuggestItem(props: SuggestItemProps) {
  const { item } = props;
  return (
    <a href={item.metadata.productLink} target="_blank" rel="noreferrer">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="40"
            image={item.metadata.imageLink}
            alt="img"
            sx={{ height: 200 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp"
            >
              {item.metadata.productDescription}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {item.productPrice}
            </Typography>
            {/*<Typography gutterBottom variant="h5" component="div">*/}
            {/*  {item.productLink}*/}
            {/*</Typography>*/}
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}
