import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { userRoutes } from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import { realEstatesRoutes } from "./routes/realStates.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app: Application = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/realEstate", realEstatesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/schedules", schedulesRoutes);
app.use(handleErrors);
export default app;
