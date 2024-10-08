import { baseSchemaOptions } from "@/database/utils";
import { Model, model, models, Schema } from "mongoose";
import { PlayerMongo, RatingHistory, Trophy } from "./types";

const ratingHistoryModelSchema = new Schema<RatingHistory>(
  {
    date: { type: Date, required: true },
    rating: { type: Number, required: true },
  },
  { _id: false }
);

const trophyModelSchema = new Schema<Trophy>(
  {
    season: { type: Number, required: true },
    ranking: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  { _id: false }
);

const playerModelSchema = new Schema<PlayerMongo>(
  {
    name: { type: String, required: true },
    games: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratingHistory: {
      type: [ratingHistoryModelSchema],
      required: true,
      default: [],
    },
    trophies: {
      type: [trophyModelSchema],
      required: false,
    },
  },
  baseSchemaOptions
);

export const playerModel =
  (models.Player as Model<PlayerMongo>) ?? model("Player", playerModelSchema);
