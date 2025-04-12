// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import dataRoutes from './routes/orderRoute.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', dataRoutes);

// // Serve static files (if needed)
// app.use(express.static('public'));

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors'
import compression from 'compression';
import dotenv from 'dotenv'
import helmet from 'helmet';
import dataRoutes from './routes/orderRoute.js';

dotenv.config()


const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "*"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
      scriptSrcAttr: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*"],
      styleSrc: ["'self'", "'unsafe-inline'", "*"],
      frameSrc: ["'self'", "*"],
      connectSrc: ["'self'", "*"],
    },
  },
}));

app.use(compression());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('tiny'));


app.use('/api', dataRoutes);

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`);
});
