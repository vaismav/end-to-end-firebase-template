import React, { ReactElement } from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';

type Props = {
  title: string;
  data: {
    title: string;
    content: string;
  }[];
};

const GenericCard = ({ title = '', data = [] }: Props): ReactElement => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {data.map((d) => (
          <div key={d.title}>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              {d.title}
            </Typography>
            <Typography variant="body2">{d.content}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { GenericCard };
