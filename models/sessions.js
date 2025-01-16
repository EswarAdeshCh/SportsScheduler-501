"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static select() {
      return this.findAll();
    }

    static deleteSessionFromDatabase(sessionId) {
      return this.destroy({
        where: {
          id: sessionId,
        },
      });
    }

    static async updateSession(sessionId, sessions) {
      try {
        // Update the session where the id matches sessionId
        const [updated] = await this.update(sessions, {
          where: {
            id: sessionId,
          },
        });

        if (updated) {
          console.log("Session updated successfully");
          return { success: true, message: "Session updated successfully" };
        } else {
          console.error("Session not found");
          return { success: false, message: "Session not found" };
        }
      } catch (error) {
        console.error("Error updating session:", error);
        return { success: false, message: "Error updating session" };
      }
    }
  }
  Sessions.init(
    {
      sport: DataTypes.STRING,
      teamA: DataTypes.STRING,
      teamB: DataTypes.STRING,
      teamAsize: DataTypes.INTEGER,
      teamBsize: DataTypes.INTEGER,
      actualSize: DataTypes.INTEGER,
      place: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Sessions",
    }
  );
  return Sessions;
};
