const Mongoose = require("mongoose");
const countryZonedSchema = new Mongoose.Schema(
  {
    country_name: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      require: false,
    },
    zone: {
      zone_name: {
        type: String,
        required: true,
      },
      zoneId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Zone", // Reference to the Zone model
      },
    },
  },
  { timestamps: true }
);

module.exports = CountriesZoned = Mongoose.model(
  "CountriesZoned",
  countryZonedSchema
);
