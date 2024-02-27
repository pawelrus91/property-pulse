import { Schema, Types, model, models } from "mongoose";
import { Property, Override } from "@/types";

type PropertySchema = Override<
  Property,
  {
    owner: Types.ObjectId;
  }
>;

const propertySchema = new Schema<PropertySchema>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
    },
    rates: {
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      nightly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: {
      type: [
        {
          type: String,
        },
      ],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = models.Property || model("Property", propertySchema);

export default PropertyModel;
