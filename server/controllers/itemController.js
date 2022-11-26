const listItem = require("../models/listItemModel");
const Conversation = require("../models/ConvesationModel");
const User = require("../models/userModel");

const addNewListing = async (req, res) => {
  console.log("adding new listing", JSON.parse(req.body.itemDetail));

  const itemDetail = JSON.parse(req.body.itemDetail);

  const { title, brand, price, category, description, tags, condition } =
    itemDetail;

  // if the item is already just update it
  // const isItemExist = await listItem.exists({_id : req})

  const savedlistingItem = await listItem.create({
    title,
    brand,
    price,
    category,
    description,
    tags,
    condition,
    addedBy: req.body._id,
    isActive: true,
    itemImageString: req.file.originalname,
  });

  if (savedlistingItem) {
    await User.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { listedProducts: savedlistingItem._id } }
    );

    res.status(200).json({
      success: true,
      message: "Item saved successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Item not saved successfully",
    });
  }
};

//  FETCHING ALL THE LISTING
const getAllListing = async (req, res) => {
  try {
    const allListing = await listItem.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: "Items fetched",
      items: allListing,
    });
  } catch (error) {
    res.send("error");
  }
};
// get listing by category
const getListing = async (req, res) => {
  try {
    const allListing = await listItem.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      message: "Items fetched",
      items: allListing,
    });
  } catch (error) {
    res.send("error");
  }
};

// get listing by id , it will also check if the logged in user has a conversation
// with the item owner, if yes then it will send the conversation too
const getItemById = async (req, res) => {
  try {
    const item = await listItem
      .findOne({ _id: req.params.listingId })
      .select("-password")
      .populate("addedBy");
    // console.log(item.populate(item.addedBy));
    if (item) {
      // console.log(item.addedBy._id.toString());

      // console.log(req.params);
      if (req.params.senderId === "null") {
        // console.log("sender is null");
        res
          .status(200)
          .json({ success: true, message: "Item Found", item: item });
      } else {
        // checking if there is any conversation with item owner and user
        try {
          // finding a conversation if there is any
          const c = await Conversation.find({
            members: {
              $eq: [req.params.senderId, item.addedBy._id.toString()],
            },
          });

          // checking if the product is in favorite array or not
          const user = await User.findOne({ _id: req.params.senderId });
          isFav = user.favoriteProducts.includes(req.params.listingId);
          // console.log(`isFav:${isFav}`);
          res.status(200).json({
            success: true,
            message: "Item Found",
            item: item,
            conversation: c,
            isFav: isFav,
          });
        } catch (error) {
          res
            .status(200)
            .json({ success: true, message: "Item Found", item: item });
        }
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Could not find the item",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Somthing Went Wrong" });
  }
};

// saving item as draft
const saveItemAsDraft = async (req, res) => {
  const itemDetail = JSON.parse(req.body.itemDetail);
  const { title, brand, price, category, description, tags, condition } =
    itemDetail;
  const savedlistingItem = await listItem.create({
    title,
    brand,
    price,
    category,
    description,
    tags,
    condition,
    addedBy: req.body._id,
    isDraft: true,
    itemImageString: req.file.originalname,
  });

  if (savedlistingItem) {
    await User.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { listedProducts: savedlistingItem._id } }
    );

    res.status(200).json({
      success: true,
      message: "Item saved successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Item not saved successfully",
    });
  }
};

// updating item
const updateItem = async (req, res) => {
  console.log("publish drafted Item");
  // console.log(req.body);
  const { title, brand, price, category, description, tags, condition } =
    JSON.parse(req.body.itemDetail);
  // console.log(title, brand, price, category, description, condition);
  console.log(
    `title : ${title} brand : ${brand} price : ${price} category : ${category} description : ${description} tags : ${tags} condition : ${condition}`
  );
  try {
    const item = await listItem.find({ _id: req.body._itemId });
    // console.log(`item :${item} `);
    let itemDetail = req.body.itemDetail;
    let itemId = req.body._itemId;
    // console.log(itemId);
    // console.log(`itemId:${itemId}`);
    console.log(item);
    // console.log(`itemDetail: ${itemDetail}`);
    if (item) {
      console.log("Updating");
      const updatedItem = await listItem.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            title,
            brand,
            price,
            category,
            description,
            itemImageString: req.file.originalname,
            condition,
            isDraft: false,
            isActive: true,
          },
        }
      );
      console.log(`updatedItem:${updateItem}`);
      res.status(200).json({ success: false, response: updatedItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// deleting item
const deleteListing = async (req, res) => {
  console.log("deleting");

  try {
    await listItem.deleteOne({ _id: req.params.listingId });

    res.status(200).json({ success: true, response: "Item Delete " });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
};

const isProductFavorite = async (req, res) => {};

module.exports = {
  addNewListing,
  getAllListing,
  getItemById,
  getListing,
  saveItemAsDraft,
  isProductFavorite,
  updateItem,
  deleteListing,
};
