import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ObjectId } from "mongodb";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { gameModel } from "../model";
import { MOCK_GAMES } from "./mocks/games.mock";
import { getMostFrequentTeammate } from "../get";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await gameModel.insertMany(MOCK_GAMES);
});

afterEach(async () => {
  await gameModel.deleteMany({});
});

describe("getMostFrequentTeammate", () => {
  it("should return the most frequent teammate", async () => {
    const playerId = "66fd3cba42d4c012ac8621d9";
    const result = await getMostFrequentTeammate(playerId);

    expect(result).toEqual({
      name: "Fabien",
      count: 4,
    });
  });

  it("should return null if no teammate is found", async () => {
    const playerId = "66fd3ccc42d4c012ac8621ec";
    const result = await getMostFrequentTeammate(playerId);

    expect(result).toBeNull();
  });
});
