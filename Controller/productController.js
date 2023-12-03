const data = require("../Store/data");
const userModel = require("../Models/userModel");
const productModel = require("../Models/productModel");
const Order = require("../Models/orderModel");

const productController = (req,res) => {
    return res.send(data);
}

const finduser = async (req, res) => {
    const user = req.user;
    if (user && user.email) {
        try {
          const userDetails = await userModel.findOne({ email: user.email });
          if (userDetails) {
            res.send(userDetails);
          } else {
            res.status(404).send("User not found");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
};


const addcart = async (req, res) => {
    console.log(req.body, "803");
  
    try {
        console.log("Request Payload:", req.body);
      const decoded = jwt.verify(req.body.userId, secret_key,{expiresIn:"1d"});
      console.log("Decoded Token:", decoded);
  
      const isUpdate = await userAccount.updateOne(
        { _id: req.body.userId },
        {
          $addToSet: { cart: req.body.productId },
        }
      );
  
      if (isUpdate) {
        return res.send({ code: 200, message: "Add Cart Is Success" });
      } else {
        return res.send({ code: 500, message: "Err In Add Cart" });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(403).json({ code: 403, message: "Forbidden" });
    }
  };

   
const searchProduct = async (req, res) => {
    const searchItem = req.query.searchItem;
    try {
        const result = await productModel.find({
          // category: { $regex: searchItem, $options: "i" },
            name: { $regex: searchItem, $options: "i" }
        })
        res.send(result);
    }
    catch (err) {
        console.log("Error in searching data:", err);
    }
  }
  
  const findProduct = async(req, res) => {
      try {
          const search = req.body.search;
          console.log(req.body.search);
          const searching = await productModel.find({
            Name: { $regex: new RegExp(search, "i") }, // "i" for case-insensitive search
          });
          console.log(search);
          if (searching.length > 0) {
            return res
              .status(200)
              .json({ success: true, msg: "Product details", data: searching });
          } else {
            return res.status(404).json({ msg: "No matching products found" });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ msg: "Internal server error" });
        }
  }

const addOrder = async (req, res) => {
    const orderDetails = req.body;
    try {
        const newOrder = await Order.create(orderDetails);
        return res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error("Error adding order:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const findOrder = async(req, res) => {
  const find = await Order.find({});
  console.log(find);
  res.send (find)
}


const addProduct = async(req,res) => {
    try{
        const productDetails = req.body;
        // const productDetails = [
        //     ///////////////////////// BUSINESS ///////////////////////////////

        // ////??? Communication ???////
        // {
        //     "id": 1,
        //     "category":"Business",
        //     "subcategory": "Communication",
        //     "image": "https://img-c.udemycdn.com/course/240x135/14284_6833_17.jpg",
        //     "name": "Powerful Business Writing: How to Write Concisely",
        //     "Wname": "Caroline McDevitt",
        //     "price": 699,
        //     "oldprice": 1999,
        //     "discr": "A concise business writing course for punchy, professional and powerful writing – at work, at university, on your blog"
        // },
        // {
        //     "id": 2,
        //     "category": "Business",
        //     "subcategory": "Communication",
        //     "image": "https://img-c.udemycdn.com/course/240x135/23972_35ee_13.jpg",
        //     "name": "Improve Communication: Speak Smoothly, Clearly & Confidently",
        //     "Wname": "Michel Williams",
        //     "price": 699,
        //     "oldprice": 2899,
        //     "discr": "Learn How You Can Clear Interviews, Express Your Ideas, & Make Presentations Smoothly & Confidently!"
        // },
        // {
        //     "id": 3,
        //     "category": "Business",
        //     "subcategory": "Communication",
        //     "image": "https://img-c.udemycdn.com/course/240x135/25671_f3b1_4.jpg",
        //     "name": "How to Write an Effective Research Paper",
        //     "Wname": "Mohammad Noori",
        //     "price": 699,
        //     "oldprice": 2699,
        //     "discr": "Learn how to write award-winning research papers with easy steps. Includes examples and a research paper template."
        // },
        // {
        //     "id": 4,
        //     "category": "Business",
        //     "subcategory": "Communication",
        //     "image": "https://img-c.udemycdn.com/course/240x135/36099_7809_6.jpg",
        //     "name": "Writing Effective Business Emails",
        //     "Wname": "Jane Watson",
        //     "price": 699,
        //     "oldprice": 1999,
        //     "discr": "Learn how to build your professional image and increase your productivity through powerful emails."
        // },
        // {
        //     "id": 5,
        //     "category": "Business",
        //     "subcategory": "Communication",
        //     "image": "https://img-c.udemycdn.com/course/240x135/38545_03aa_6.jpg",
        //     "name": "Minute Taking at Meetings",
        //     "Wname": "Jane Watson",
        //     "price": 699,
        //     "oldprice": 2899,
        //     "discr": "Minute Taking: making the taking of notes/minutes at formal and informal meetings easier"
        // },

        // ////??? Management ???////

        // {
        //     "id": 6,
        //     "category": "Business",
        //     "subcategory": "Management",
        //     "image": "https://img-c.udemycdn.com/course/240x135/15305_0987_6.jpg",
        //     "name": "Chief Financial Officer Leadership Program",
        //     "Wname": "Blair cook CPA",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "An ever expanding program of courses helping financial professionals aspire to the top levels of financial leadership"
        // },
        // {
        //     "id": 7,
        //     "category": "Business",
        //     "subcategory": "Management",
        //     "image": "https://img-c.udemycdn.com/course/240x135/34268_4bc5_17.jpg",
        //     "name": "QMS Auditor / Lead Auditor Course",
        //     "Wname": "Sandeep Kumar",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "Plan and Confidently Conduct Quality Management System Audits - Auditing Explained in Plain and Simple Language."
        // },
        // {
        //     "id": 8,
        //     "category": "Business",
        //     "subcategory": "Management",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/57427_1fdb_6.jpg",
        //     "name": "Supervisor Leadership Skills for a Safe Workplace",
        //     "Wname": "Marie-Claire Ross",
        //     "price": 699,
        //     "oldprice": 2299,
        //     "discr": "Learn safety communication skills to foster safety accountability, responsibility and correct safety behaviours."
        // },
        // {
        //     "id": 9,
        //     "category": "Business",
        //     "subcategory": "Management",
        //     "image": "https://img-c.udemycdn.com/course/240x135/65833_2997_3.jpg",
        //     "name": "How to Run truly Productive Meetings – and add value",
        //     "Wname": "7 Keys Solutions",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Learn to Run Great Meetings, Raise Your Profile and Boost Productivity"
        // },
        // {
        //     "id": 10,
        //     "category": "Business",
        //     "subcategory": "Management",
        //     "image": "https://img-c.udemycdn.com/course/240x135/110240_9cb3_8.jpg",
        //     "name": "How to Manage & Influence Your Virtual Team",
        //     "Wname": "Hassan Osman",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Learn step-by-step tips that help you get things done with your virtual team by increasing trust and accountability"
        // },

        // ////??? Business_Strategy ???////

        // {
        //     "id": 11,
        //     "category": "Business",
        //     "subcategory": "Business_Strategy",
        //     "image": "https://img-c.udemycdn.com/course/240x135/17782_50e2_14.jpg",
        //     "name": "Master Your Mindset & Brain: Framestorm Your Way to Success",
        //     "Wname": "Anette Prehn",
        //     "price": 699,
        //     "oldprice": 2899,
        //     "discr": "Excel in any situation. Tweak your mindset in brain-smart ways. Master class in reframing based on neuroscience."
        // },
        // {
        //     "id": 12,
        //     "category": "Business",
        //     "subcategory": "Business_Strategy",
        //     "image": "https://img-c.udemycdn.com/course/240x135/67740_ce84_11.jpg",
        //     "name": "International Expansion: A Blueprint for Success",
        //     "Wname": "Anthony Gioeli",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "An Action Plan to Profitably Expand Your Business Through International Sales and Partnerships"
        // },
        // {
        //     "id": 13,
        //     "category": "Business",
        //     "subcategory": "Business_Strategy",
        //     "image": "https://img-c.udemycdn.com/course/240x135/170840_3e57_5.jpg",
        //     "name": "How to Write the Ultimate 1 Page Strategic Business Plan",
        //     "Wname": "William U.Pena",
        //     "price": 699,
        //     "oldprice": 1699,
        //     "discr": "Learn to Write a 1 Page Strategic Plan That Will Easily Bring You a 6 - 7 Figure Income & Guaranteed Business Success"
        // },
        // {
        //     "id": 14,
        //     "category": "Business",
        //     "subcategory": "Business_Strategy",
        //     "image": "https://img-c.udemycdn.com/course/240x135/179174_fe95_10.jpg",
        //     "name": "How To Write A Business Plan And A Winning Business Model",
        //     "Wname": "Alex Genadinik",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "Business plan template & business plan examples: Create a top business model & business plan for your business ideas"
        // },
        // {
        //     "id": 15,
        //     "category": "Business",
        //     "subcategory": "Business_Strategy",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/220646_061f_4.jpg",
        //     "name": "Business Plan: For Startup & Small Business Success Today!",
        //     "Wname": "Boomy Tokan",
        //     "price": 699,
        //     "oldprice": 2299,
        //     "discr": "Business Planning success can be easily achieved by using this Comprehensive Business Plan & Cashflow Forecast template."
        // },

        // ////??? Operations ???////

        // {
        //     "id": 16,
        //     "category": "Business",
        //     "subcategory": "Operations",
        //     "image": "https://img-c.udemycdn.com/course/240x135/59772_57a8_9.jpg",
        //     "name": "Customer Success | Profit from the Power of Your Customers",
        //     "Wname": "Chuck wall",
        //     "price": 699,
        //     "oldprice": 2499,
        //     "discr": "The objective of this course is to help participants better understand why companies need to align themselves with the values of their customers. • Participants will be introduced to Chuck Wall’s Customer CEO Nine Powers. Much of the information presented is based upon Chuck’s primary research,"
        // },
        // {
        //     "id": 17,
        //     "category": "Business",
        //     "subcategory": "Operations",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/120872_80cf_16.jpg",
        //     "name": "Customer Success | How to Understand Your Customers",
        //     "Wname": "Chuck Wall",
        //     "price": 699,
        //     "oldprice": 2899,
        //     "discr": "The objective of this course is to equip you with the knowledge to better understand your customers. Upon course completion, you will have a deeper knowledge to help move your organization"
        // },
        // {
        //     "id": 18,
        //     "category": "Business",
        //     "subcategory": "Operations",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/120976_b4c7_7.jpg",
        //     "name": "Customer Success | How to Put Your Customers First",
        //     "Wname": "Chuck Wall",
        //     "price": 799,
        //     "oldprice": 1999,
        //     "discr": "The objective of this course is to help equip you with principles and frameworks to confront the new market reality that customers are in charge. Upon course completion, you begin to see current and future customers in an entirely new light. This will help your companies succeed and your career flourish."
        // },
        // {
        //     "id": 19,
        //     "category": "Business",
        //     "subcategory": "Operations",
        //     "image": "https://img-c.udemycdn.com/course/240x135/120978_ea9a_8.jpg",
        //     "name": "Customer Success | How to Exceed Your Customers Expectations",
        //     "Wname": "Chuck Wall",
        //     "price": 799,
        //     "oldprice": 1999,
        //     "discr": "The objective of this course is to help you better understand how to exceed customers expectations by creating more value every day."
        // },
        // {
        //     "id": 20,
        //     "category": "Business",
        //     "subcategory": "Operations",
        //     "image": "https://img-c.udemycdn.com/course/240x135/123570_05bc_7.jpg",
        //     "name": "Customer Success | How to Listen to Today's Customers",
        //     "Wname": "Chuck Wall",
        //     "price": 799,
        //     "oldprice": 1999,
        //     "discr": "The objective of this course is to help participants better understand why companies must listen to their customers by using social media."
        // },

        // ////??? Human_Resources ???////

        // {
        //     "id": 21,
        //     "category": "Business",
        //     "subcategory": "Human_Resources",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/76978_f766_5.jpg",
        //     "name": "Understanding and Complying with HIPAA",
        //     "Wname": "Scott Koller",
        //     "price": 599,
        //     "oldprice": 1599,
        //     "discr": "This program will train you on the HIPAA and provide an overview on the rules governing protected health information."
        // },
        // {
        //     "id": 22,
        //     "category": "Business",
        //     "subcategory": "Human_Resources",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/125808_615a_9.jpg",
        //     "name": "World-Class HR: 21st Century Talent Management",
        //     "Wname": "Josh Bersin",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Learn about the challenges and opportunities of modern human resources (HR). Attract and retain the best people."
        // },
        // {
        //     "id": 23,
        //     "category": "Business",
        //     "subcategory": "Human_Resources",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/260018_ddb0_5.jpg",
        //     "name": "International Business Etiquette",
        //     "Wname": "Kimberly Law",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Soft skills needed to interact effectively in a business setting"
        // },
        // {
        //     "id": 24,
        //     "category": "Business",
        //     "subcategory": "Human_Resources",
        //     "image": "https://img-c.udemycdn.com/course/240x135/312042_7f9e_2.jpg",
        //     "name": "Recruitment Interviewing Essentials: Interviewing Made Easy",
        //     "Wname": "Richard Lock",
        //     "price": 699,
        //     "oldprice": 2899,
        //     "discr": "Start hiring confidently, interview skilfully & make recruitment decisions professionally. Avoid costly hiring mistakes."
        // },
        // {
        //     "id": 25,
        //     "category": "Business",
        //     "subcategory": "Human_Resources",
        //     "image": "https://img-c.udemycdn.com/course/240x135/322302_1979_2.jpg",
        //     "name": "Interviewing Skills: Conducting Job Interviews",
        //     "Wname": "TJ Walker",
        //     "price": 799,
        //     "oldprice": 2899,
        //     "discr": "Interviewing Skills: What managers need to know to prepare for and deliver job interviews for new employees."
        // },


        // ///////////////////////// Finance_Accounting ///////////////////////////////


        // ////??? Accounting_Bookkeeping ???////

        // {
        //     "id": 26,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/32908_4e19_7.jpg",
        //     "name": "The Complete Introduction To Accounting and Finance",
        //     "Wname": "Chris Benjamin",
        //     "price": 699,
        //     "oldprice": 4199,
        //     "discr": "The Original Course on Accounting & Finance! It's easy once you know the basics. Learn introductory accounting & finance"
        // },
        // {
        //     "id": 27,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/48841_9110_7.jpg",
        //     "name": "Accounting in 60 Minutes - A Brief Introduction",
        //     "Wname": "Vincent Turner",
        //     "price": 699,
        //     "oldprice": 4399,
        //     "discr": "Learn the very basics of accounting in just about an hour."
        //   },
        //   {
        //     "id": 28,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Accounting_Bookkeeping",
        //     "image": "https://img-c.udemycdn.com/course/240x135/133428_e67a_18.jpg",
        //     "name": "Accounting: From Beginner to Advanced!",
        //     "Wname": "Stefan Ignatovski",
        //     "price": 699,
        //     "oldprice": 2599,
        //     "discr": "Learn accounting like never before. Learn easy and fast. Easy to understand Accounting. #1 accounting course online."
        //   },
        //   {
        //     "id": 29,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Accounting_Bookkeeping",
        //     "image": "https://img-c.udemycdn.com/course/240x135/206092_4aa3_8.jpg",
        //     "name": "Principles of Financial Accounting",
        //     "Wname": "Dr Jhon",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Learn the complete accounting cycle -recording business transactions to presenting the Balance Sheet & Income Statement"
        //   },
        //   {
        //     "id": 30,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Accounting_Bookkeeping",
        //     "image": "https://img-c.udemycdn.com/course/240x135/302562_c781_9.jpg",
        //     "name": "Financial Accounting - #1 Ranked University: Course 1 of 5",
        //     "Wname": "Norm Nemrow",
        //     "price": 699,
        //     "oldprice": 2999,
        //     "discr": "Honored by the President of the United States for outstanding teaching, learn Accounting from the self-made millionaire."
        //   },
      
        //   ////??? Compliance ???////
          
        //   {
        //     "id": 31,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Compliance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/968248_92cb_3.jpg",
        //     "name": "Anti Money Laundering & Countering of Terrorist Financing",
        //     "Wname": "Complyfin",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "From Leading Subject Matter Experts, Compliance , AML/CFT (Consolidated Quick Learning Video)"
        //   },
        //   {
        //     "id": 32,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Compliance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1078520_682c_2.jpg",
        //     "name": "Internal Controls - Design, Implementation and Monitoring",
        //     "Wname": "Maciej Rychlicki",
        //     "price": 699,
        //     "oldprice": 3399,
        //     "discr": "Become a compliance specialist, maintain strong internal controls for SOX or FCPA, prepare for internal & external audit"
        //   },
        //   {
        //     "id": 33,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Compliance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1315036_6df1_2.jpg",
        //     "name": "COSO 2013 Requirements and Implementation Overview",
        //     "Wname": "Lynn Fountain",
        //     "price": 699,
        //     "oldprice": 3599,
        //     "discr": "This course provides an overview of the important concepts of COSO 2013."
        //   },
        //   {
        //     "id": 34,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Compliance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1315260_c654_2.jpg",
        //     "name": "Introduction to Sarbanes Oxley (SOX)",
        //     "Wname": "lynn Fountain",
        //     "price": 699,
        //     "oldprice": 3799,
        //     "discr": "This course is an overview of the proper processes, controls and tests for adequate internal control."
        //   },
        //   {
        //     "id": 35,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Compliance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1317200_07c5_2.jpg",
        //     "name": "Operationalizing COSO",
        //     "Wname": "Lynn Fountain",
        //     "price": 699,
        //     "oldprice": 3999,
        //     "discr": "This course examines the COSO attributes and 17 components and speak to what procedures need to be considered."
        //   },
      
        //   ////??? Economic ???////

        //   {
        //     "id": 36,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/398980_ffe8.jpg",
        //     "name": "The economic model of emerging countries - Michael Spence",
        //     "Wname": "EDOOTV",
        //     "price": 699,
        //     "oldprice": 2199,
        //     "discr": "Understanding Economics. Learn how the world works and why it is the way it it."
        //   },
          
        //   {
        //     "id": 37,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/638604_c94a_4.jpg",
        //     "name": "(Oxford) Master Diploma : Economics (Includes Macro/Micro)",
        //     "Wname": "Chris",
        //     "price": 699,
        //     "oldprice": 2399,
        //     "discr": "Micro/Macro/Global/Business/Behavioural Economics"
        //   },
        //   {
        //     "id": 38,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/767836_a4d6_2.jpg",
        //     "name": "Understanding Macroeconomics for University and Business",
        //     "Wname": "Sifedean",
        //     "price": 699,
        //     "oldprice": 4599,
        //     "discr": "Explaining the economics of fiscal policy, money creation, and monetary policy"
        //   },
        //   {
        //     "id": 39,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "https://img-c.udemycdn.com/course/240x135/895674_a609_4.jpg",
        //     "name": "Economics Decoded: 10 Essential Principles Shaping Our World",
        //     "Wname": "Evrim",
        //     "price": 699,
        //     "oldprice": 4799,
        //     "discr": "Master the application of 10 core economics principles to make informed decisions in both professional and personal life"
        //   },
        //   {
        //     "id": 40,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Economic",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/1378318_d894_6.jpg",
        //     "name": "Economics: Market Forces of Demand, Supply and Equilibrium",
        //     "Wname": "Evrim Kanbur",
        //     "price": 699,
        //     "oldprice": 4999,
        //     "discr": "Economics: Analyzing Demand, Supply and Market Equilibrium with real life case studies"
        //   },
      
        //   ////??? Finance ???////

        //   {
        //     "id": 41,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Finance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/109988_0b7b_15.jpg",
        //     "name": "Understand Banks & Financial Markets",
        //     "Wname": "Michiel van den",
        //     "price": 699,
        //     "oldprice": 5199,
        //     "discr": "The world of financial markets: participants, products, trading motives, pricing and structure"
        //   },
        //   {
        //     "id": 42,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Finance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/145404_6cbe_3.jpg",
        //     "name": "Personal Financial Well-Being",
        //     "Wname": "Richard",
        //     "price": 699,
        //     "oldprice": 5399,
        //     "discr": "Understanding Your Financial Life"
        //   },
        //   {
        //     "id": 43,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Finance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/178602_6a9e_5.jpg",
        //     "name": "The Complete Guide to the Global Capital Markets",
        //     "Wname": "paul Siegel",
        //     "price": 699,
        //     "oldprice": 5599,
        //     "discr": "Financial Markets | Financial Math | FX | Derivatives | Futures & Options | Equities Stocks | Fixed Income Bonds"
        //   },
        //   {
        //     "id": 44,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Finance",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/179500_d47e_5.jpg",
        //     "name": "Interest Rate Swaps: Structure, Pricing & Risk Management",
        //     "Wname": "Paul Segial",
        //     "price": 699,
        //     "oldprice": 5799,
        //     "discr": "Interest Rate Swaps | Risk Management | Hedging | OTC Clearinghouses | Swap Valuation | Floating Interest Rates"
        //   },
        //   {
        //     "id": 45,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Finance",
        //     "image": "https://img-c.udemycdn.com/course/240x135/180372_3341_5.jpg",
        //     "name": "Mortgage Backed Securities (MBS): Basic to Advanced",
        //     "Wname": "Paul Siegel",
        //     "price": 699,
        //     "oldprice": 5999,
        //     "discr": "Financial Markets | MBS | Asset Securitization | Mortgage Loans | Cash Flows | CMOs | PAC Bond Tranches"
        //   },

        //   ////??? Taxes ???////

        //   {
        //     "id": 46,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Taxes",
        //     "image": "https://img-c.udemycdn.com/course/240x135/354336_ff6f_10.jpg",
        //     "name": "US Income Taxes - Income Tax Preparation Simplified for You",
        //     "Wname": "Majo Jacinto",
        //     "price": 699,
        //     "oldprice": 5199,
        //     "discr": "The A – Z of self-preparing and e-filing your basic income taxes by 04/15. Income tax preparation made easy for you."
        //   },
        //   {
        //     "id": 47,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Taxes",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1172716_e612.jpg",
        //     "name": "Personal Income Tax in Canada",
        //     "Wname": "Debi peverill",
        //     "price": 699,
        //     "oldprice": 5399,
        //     "discr": "save money when you file your personal tax return"
        //   },
        //   {
        //     "id": 48,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Taxes",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2045146_c508.jpg",
        //     "name": "Tax & Adjusting Entry Year-End Accounting Excel Worksheet",
        //     "Wname": "Robert(Bob)",
        //     "price": 699,
        //     "oldprice": 5599,
        //     "discr": "Build Excel worksheet for adjusting adjusting & tax entries, reconciling net income calculated on a book and tax basis"
        //   },
        //   {
        //     "id": 49,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Taxes",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/2064303_8542_2.jpg",
        //     "name": "Do your own UK Tax Return",
        //     "Wname": "Marion Thomson",
        //     "price": 699,
        //     "oldprice": 5799,
        //     "discr": "Everything you need to know to submit your own UK self assessment tax return online with HMRC"
        //   },
        //   {
        //     "id": 50,
        //     "category": "Finance_Accounting",
        //     "subcategory": "Taxes",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2105458_c48e_3.jpg",
        //     "name": "Tax Preparation and Law 2023, 2022, 2021, 2020, & 2019",
        //     "Wname": "Robert(Bob)",
        //     "price": 699,
        //     "oldprice": 5999,
        //     "discr": "Unlock Tax Filing Confidence with Practical Examples & Step-by-Step Instructions in this Comprehensive Income Tax Course"
        //   },


        //   ///////////////////////// IT_Software ///////////////////////////////

        //   ////??? IT_Certification ???////

        //   {
        //     "id": 51,
        //     "category": "IT_Software",
        //     "subcategory": "IT_Certification",
        //     "image": "https://img-c.udemycdn.com/course/240x135/10812_b0af_6.jpg",
        //     "name": "CCNA 2020 200-125 Video Boot Camp With Chris Bryant",
        //     "Wname": "Chris Bryant",
        //     "price": 699,
        //     "oldprice": 2199,
        //     "discr": "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!"
        //   },
        //   {
        //     "id": 52,
        //     "category": "IT_Software",
        //     "subcategory": "IT_Certification",
        //     "image": "https://img-c.udemycdn.com/course/240x135/16429_c92e_5.jpg",
        //     "name": "CCNP All-in-1 Video Boot Camp With Chris Bryant",
        //     "Wname": "Chris Bryant",
        //     "price": 699,
        //     "oldprice": 2399,
        //     "discr": "Earn Your CCNP With Chris Bryant ! Pass SWITCH 300-115, ROUTE 300-101, and TSHOOT 300-135!"
        //   },
        //   {
        //     "id": 53,
        //     "category": "IT_Software",
        //     "subcategory": "IT_Certification",
        //     "image": "https://img-c.udemycdn.com/course/240x135/301456_ff8f_12.jpg",
        //     "name": "Certified Six Sigma Yellow Belt Training",
        //     "Wname": "Sandeep Kumar",
        //     "price": 699,
        //     "oldprice": 2599,
        //     "discr": "Aligned with internationally accepted CSSYB, LSSYB Body of Knowledge + Certification. In an easy to understand language"
        //   },
        //   {
        //     "id": 54,
        //     "category": "IT_Software",
        //     "subcategory": "IT_Certification",
        //     "image": "https://img-c.udemycdn.com/course/240x135/314338_2f09_7.jpg",
        //     "name": "Lean Six Sigma Yellow Belt Online Course",
        //     "Wname": "Nilakantasrinivasan",
        //     "price": 699,
        //     "oldprice": 2799,
        //     "discr": "Prepare to Obtain Yellow Belt Certification - Get awesome Jobs, Promotions and Pay hikes like an MBA. ASQ / IASSC CSSYB"
        //   },
        //   {
        //     "id": 55,
        //     "category": "IT_Software",
        //     "subcategory": "IT_Certification",
        //     "image": "https://img-c.udemycdn.com/course/240x135/314744_8347.jpg",
        //     "name": "Lean Six Sigma Green Belt Online Course (2023)",
        //     "Wname": "Nilakantasrinivasan",
        //     "price": 699,
        //     "oldprice": 2999,
        //     "discr": "Prepare for CSSGB Certification-176 Lect/ 16 + Hrs/Minitab/Download 108 Resources/LSS Case Study/Eng Subtitles/Mock Tes"
        //   },
          
        //   ////??? Network_Security ???////

        //   {
        //     "id": 56,
        //     "category": "IT_Software",
        //     "subcategory": "Network_Security",
        //     "image": "https://img-c.udemycdn.com/course/240x135/22591_b568_6.jpg",
        //     "name": "Introduction To Fiber Optic Cabling ",
        //     "Wname": "Sebastian",
        //     "price": 699,
        //     "oldprice": 3199,
        //     "discr": "Welcome! This course is designed to give you a good understand of fiber optics and fiber data transmission."
        //   },
        //   {
        //     "id": 57,
        //     "category": "IT_Software",
        //     "subcategory": "Network_Security",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/32199_6ad0_6.jpg",
        //     "name": "IT Troubleshooting Skill Training ",
        //     "Wname": "Noel",
        //     "price": 699,
        //     "oldprice": 3399,
        //     "discr": "IT Troubleshooting 101 for Analysts and Managers"
        //   },
        //   {
        //     "id": 58,
        //     "category": "IT_Software",
        //     "subcategory": "Network_Security",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/62109_9be0_8.jpg",
        //     "name": "Computer Forensics Fundamentals",
        //     "Wname": "John boyle",
        //     "price": 699,
        //     "oldprice": 3599,
        //     "discr": "An introduction to Computer Forensics, to demonstrate the process of going from the crime scene to the court room."
        //   },
        //   {
        //     "id": 59,
        //     "category": "IT_Software",
        //     "subcategory": "Network_Security",
        //     "image": "https://img-c.udemycdn.com/course/240x135/65618_be53_7.jpg",
        //     "name": "Mastering Modbus RS485 Network Communication",
        //     "Wname": "Emile Ackbarali",
        //     "price": 699,
        //     "oldprice": 3799,
        //     "discr": "Learn how to design, implement and manage the most popular automation networking system in the world."
        //   },
        //   {
        //     "id": 60,
        //     "category": "IT_Software",
        //     "subcategory": "Network_Security",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/76838_e5b4_6.jpg",
        //     "name": "Master Computers - From Beginner to Expert in One Week",
        //     "Wname": "Todd McLeod",
        //     "price": 699,
        //     "oldprice": 3999,
        //     "discr": "Learn from a highly rated instructor with over 20 years of experience teaching individuals of all ability levels."
        //   },
          
        //   ////??? Hardware ???////

        //   {
        //     "id": 61,
        //     "category": "IT_Software",
        //     "subcategory": "Hardware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/53911_4529_2.jpg",
        //     "name": "The Theory Behind Electronics - A Beginners Guide",
        //     "Wname": "Idan Gabrieli",
        //     "price": 699,
        //     "oldprice": 4199,
        //     "discr": "Start your Journey in Electronics with a Solid Background - Current, Voltage, Resistance and Power"
        //   },
        //   {
        //     "id": 62,
        //     "category": "IT_Software",
        //     "subcategory": "Hardware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/88188_c111_13.jpg",
        //     "name": "Learn 5 PLCs in a Day-AB, Siemens, Schneider, Omron & Delta",
        //     "Wname": "Rajvir Singh",
        //     "price": 699,
        //     "oldprice": 4399,
        //     "discr": "PLC Programming of Allen Bradley, Delta, Siemens, Omron & Schneider using LIVE Examples with HMI Interfacing"
        //   },
        //   {
        //     "id": 63,
        //     "category": "IT_Software",
        //     "subcategory": "Hardware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/118042_251a_13.jpg",
        //     "name": "PLC Fundamentals (Level I)",
        //     "Wname": "Paul Lynn",
        //     "price": 699,
        //     "oldprice": 4599,
        //     "discr": "This course will give a person with no prior experience the basic tools necessary to create a PLC program from scratch."
        //   },
        //   {
        //     "id": 64,
        //     "category": "IT_Software",
        //     "subcategory": "Hardware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/187626_1734_6.jpg",
        //     "name": "Advanced AC Drive- VFD, Servo & Stepper - Powerflex & Delta",
        //     "Wname": "Rajvir Singh",
        //     "price": 699,
        //     "oldprice": 4799,
        //     "discr": "Learn programming and PLC Interfacing of Allen Bradley & Delta AC Drives - VFD and Servo by LIVE Examples"
        //   },
        //   {
        //     "id": 65,
        //     "category": "IT_Software",
        //     "subcategory": "Hardware",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/395822_2ae9_5.jpg",
        //     "name": "How To Build a Computer: A Beginner's Guide",
        //     "Wname": "Nathan Cope",
        //     "price": 699,
        //     "oldprice": 4999,
        //     "discr": "Build a computer from scratch, while learning about each component and how they work along the way."
        //   },
          
        //   ////??? Operating_System ???////

        //   {
        //     "id": 66,
        //     "category": "IT_Software",
        //     "subcategory": "Operating_System",
        //     "image": "https://img-c.udemycdn.com/course/240x135/95246_69f4_23.jpg",
        //     "name": "Linux Command Line Basics",
        //     "Wname": "Ahmed Alkabary",
        //     "price": 699,
        //     "oldprice": 5199,
        //     "discr": "This is an introductory course to the Linux command Line. It's great for both Linux beginners and advanced Linux users."
        //   },
        //   {
        //     "id": 67,
        //     "category": "IT_Software",
        //     "subcategory": "Operating_System",
        //     "image": "https://img-c.udemycdn.com/course/240x135/98434_d5d1_3.jpg",
        //     "name": "Unix For Beginners",
        //     "Wname": "Skil Tree",
        //     "price": 699,
        //     "oldprice": 5399,
        //     "discr": "Absolute beginners to Unix - Learn the basic Unix Commands"
        //   },
        //   {
        //     "id": 68,
        //     "category": "IT_Software",
        //     "subcategory": "Operating_System",
        //     "image": "https://img-c.udemycdn.com/course/240x135/137194_ece8_20.jpg",
        //     "name": "Complete Linux Administration Course for Career Success 2024",
        //     "Wname": "M Khalil",
        //     "price": 699,
        //     "oldprice": 5599,
        //     "discr": "Master the Linux Administration & Linux Command Line Skills You Need to effectively Land a Job or Advance Your Career"
        //   },
        //   {
        //     "id": 69,
        //     "category": "IT_Software",
        //     "subcategory": "Operating_System",
        //     "image": "	https://img-c.udemycdn.com/course/240x135/149910_25f7_7.jpg",
        //     "name": "Linux for Beginners",
        //     "Wname": "Jason cannon",
        //     "price": 699,
        //     "oldprice": 5799,
        //     "discr": "An Introduction to the Linux Operating System and Command Line"
        //   },
        //   {
        //     "id": 70,
        //     "category": "IT_Software",
        //     "subcategory": "Operating_System",
        //     "image": "https://img-c.udemycdn.com/course/240x135/256758_e35d_5.jpg",
        //     "name": "Learn Linux in 5 Days and Level Up Your Career",
        //     "Wname": "Jason cannon",
        //     "price": 699,
        //     "oldprice": 5999,
        //     "discr": "Use the in-demand Linux skills you learn in this course to get promoted or start a new career as a Linux professional."
        //   },
          
        //   ////??? Other_ITSoftware ???////

        //   {
        //     "id": 71,
        //     "category": "IT_Software",
        //     "subcategory": "Other_ITSoftware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/55282_cbd6_13.jpg",
        //     "name": "Information Technology Essentials",
        //     "Wname": "Destin Learning",
        //     "price": 699,
        //     "oldprice": 6199,
        //     "discr": "Introduction to Information Technology and Information Systems"
        //   },
        //   {
        //     "id": 72,
        //     "category": "IT_Software",
        //     "subcategory": "Other_ITSoftware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/149880_b894_2.jpg",
        //     "name": "Learn SQL Queries",
        //     "Wname": "Deve Merton",
        //     "price": 699,
        //     "oldprice": 6399,
        //     "discr": "Learn about SQL queries quickly. Get up to speed with SELECT, FROM, WHERE, ORDER BY. BONUS: Stored Procedures!"
        //   },
        //   {
        //     "id": 73,
        //     "category": "IT_Software",
        //     "subcategory": "Other_ITSoftware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/175866_825f.jpg",
        //     "name": "Oracle GoldenGate 12c database replication workshop",
        //     "Wname": "Javier Morales",
        //     "price": 699,
        //     "oldprice": 6599,
        //     "discr": "Learn database replication by creating virtual machines with Oracle GoldenGate 12c on Oracle 12c Multitenant databases."
        //   },
        //   {
        //     "id": 74,
        //     "category": "IT_Software",
        //     "subcategory": "Other_ITSoftware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/326806_a18d_5.jpg",
        //     "name": "Data Modeling and Relational Database Design using ERwin",
        //     "Wname": "Haris kilikuto",
        //     "price": 699,
        //     "oldprice": 6799,
        //     "discr": "Course that teaches how ERwin Data modeler can help you create & maintain sound relational database designs"
        //   },
        //   {
        //     "id": 75,
        //     "category": "IT_Software",
        //     "subcategory": "Other_ITSoftware",
        //     "image": "https://img-c.udemycdn.com/course/240x135/345340_1d59_8.jpg",
        //     "name": "Java Web Services",
        //     "Wname": "Bharat",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to design,create , consume and secure SOAP and REST web services from scratch in easy steps."
        //   },
        //   {
        //     "id": 76,
        //     "category": "Desine",
        //     "subcategory": "web_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/246154_d8b0_3.jpg",
        //     "name": "Web Design for Beginners: Real World Coding in HTML & CSS",
        //     "Wname": "web Design",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Launch a career as a web designer by learning HTML5, CSS3, responsive design, Sass and more!"
        //   },
        //   {
        //     "id": 77,
        //     "category": "Desine",
        //     "subcategory": "web_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/271228_ce5b_9.jpg",
        //     "name": "WordPress Development with Bootstrap: The Complete Course",
        //     "Wname": "Development",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Become a WordPress Developer in 2022 and build beautiful, responsive WordPress Themes in PHP, JavaScript & Elementor."
        //   },
        //   {
        //     "id": 78,
        //     "category": "Desine",
        //     "subcategory": "web_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/355212_948a_10.jpg",
        //     "name": "Wordpress for Beginners - Master Wordpress Quickly",
        //     "Wname": "Beginners",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "In 2023, build a beautiful responsive Wordpress site that looks great on all devices. No experience required."
        //   },
        //   {
        //     "id": 79,
        //     "category": "Desine",
        //     "subcategory": "web_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/411446_6806_10.jpg",
        //     "name": "WordPress: Create Stunning Wordpress Websites for Business",
        //     "Wname": "WordPress",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Create a Professional Wordpress Websites For Business or Personal Use. SEO, Wordpress development, website design."
        //   },
        //   {
        //     "id": 80,
        //     "category": "Desine",
        //     "subcategory": "web_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/512678_47fd.jpg",
        //     "name": "AngularJS Crash Course for Beginners",
        //     "Wname": "AngularJS",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn the essentials you'll need to get started with AngularJS. Advance your web dev skills to build web apps FAST."
        //   },
  
  
        //   {
        //     "id": 81,
        //     "category": "Desine",
        //     "subcategory": "game_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/66200_2b89_8.jpg",
        //     "name": "Introduction to Game Localization",
        //     "Wname": "Game Localization",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Become a translator, tester or project manager specialized in gamelocalization and get paid for your gaming passion"
        //   },
        //   {
        //     "id": 82,
        //     "category": "Desine",
        //     "subcategory": "game_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/397936_513f_3.jpg",
        //     "name": "Pixel art for Video games",
        //     "Wname": "games",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The essential course for creating stunning pixel art graphics for video-games or stylish illustrations and designs"
        //   },
        //   {
        //     "id": 83,
        //     "category": "Desine",
        //     "subcategory": "game_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/526534_04bb_4.jpg",
        //     "name": "The Game Design and AI Master Class Beginner to Expert",
        //     "Wname": "Class Beginner to Expert",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "3D game design, 2D game design, AI art, VR/AR/XR, Unity, coding, C#, game development, animation, programming, Photoshop"
        //   },
        //   {
        //     "id": 84,
        //     "category": "Desine",
        //     "subcategory": "game_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1208228_d61c_4.jpg",
        //     "name": "Digitally Painting Light and Color: Amateur to Master",
        //     "Wname": "Amateur to Master",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn the fundamentals of light and color and take your art to the next level."
        //   },
        //   {
        //     "id": 85,
        //     "category": "Desine",
        //     "subcategory": "game_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1318732_86ee_3.jpg",
        //     "name": "Visual Effects for Games in Unity - Beginner To Intermediate",
        //     "Wname": "Beginner To Intermediate",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "By the end of this course you will have started your own portfolio as a Triple-A Visual Effects artist for Games."
        //   },
  
  
        //   {
        //     "id": 86,
        //     "category": "Desine",
        //     "subcategory": "animation_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/222122_ad46_6.jpg",
        //     "name": "Master SketchUp  - A Definitive Guide From Infinite Skills",
        //     "Wname": "Guide From Infinite Skills",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "A easy to follow SketchUp course that teaches using practical examples."
        //   },
        //   {
        //     "id": 87,
        //     "category": "Desine",
        //     "subcategory": "animation_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/269778_a286_16.jpg",
        //     "name": "3ds Max + V-Ray: 3ds Max PRO in 6 hrs",
        //     "Wname": "3ds Max PRO in 6 hrs",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "3ds Max intro course: 3Ds Max and V-Ray for creating 3D architectural imagery, from beginner to advanced"
        //   },
        //   {
        //     "id": 88,
        //     "category": "Desine",
        //     "subcategory": "animation_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/304452_a337.jpg",
        //     "name": "The Complete Autodesk Navisworks Course (BIM Tool)",
        //     "Wname": "Navisworks Course (BIM Tool)",
        //     "price": 599,
        //     "oldprice": 2999,
        //     "discr": "Control your project outcomes by reviewing the project models with Autodesk Navisworks"
        //   },
        //   {
        //     "id": 89,
        //     "category": "Desine",
        //     "subcategory": "animation_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/438522_500f_7.jpg",
        //     "name": "Complete Blender Creator: Learn 3D Modelling for Beginners",
        //     "Wname": "Modelling for Beginners",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Use Blender to Create Beautiful 3D models for Video Games, 3D Printing & More. Beginners Level Course"
        //   },
        //   {
        //     "id": 90,
        //     "category": "Desine",
        //     "subcategory": "animation_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/451062_1523_16.jpg",
        //     "name": "PowerPoint Kinetic Typography Microsoft PowerPoint animation",
        //     "Wname": "Microsoft PowerPoint animation",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn Advanced PowerPoint animation. Use Microsoft Powerpoint for kinetic typography and animated PPT presentations"
        //   },
  
  
  
        //   {
        //     "id": 91,
        //     "category": "Desine",
        //     "subcategory": "fashion_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/472114_a27c_3.jpg",
        //     "name": "Learn to draw fashion with Adobe Illustrator CC - Beginners",
        //     "Wname": "Beginners",
        //     "price": 599,
        //     "oldprice": 2999,
        //     "discr": "Illustrator training specifically tailored for fashion designers"
        //   },
        //   {
        //     "id": 92,
        //     "category": "Desine",
        //     "subcategory": "fashion_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/541658_26e0_2.jpg",
        //     "name": "Look Your VERY best – Learn about Color, Style & Fashion",
        //     "Wname": "Style & Fashion",
        //     "price": 599,
        //     "oldprice": 2999,
        //     "discr": "Create Your Unique Style – With YOUR Best Colors, Cuts, Lines, Prints and Accessories."
        //   },
        //   {
        //     "id": 93,
        //     "category": "Desine",
        //     "subcategory": "fashion_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1768758_aaeb_6.jpg",
        //     "name": "How To Create A Fashion Collection and Launch Your Own Brand",
        //     "Wname": " Launch Your Own Brand",
        //     "price": 699,
        //     "oldprice": 2999,
        //     "discr": "Designing a Fashion Line. A step-by-step Comprehensive Guide for Mastering Fashion Designing: from Inspiration to Market"
        //   },
        //   {
        //     "id": 94,
        //     "category": "Desine",
        //     "subcategory": "fashion_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2200350_37d8_4.jpg",
        //     "name": "Pattern Making for Fashion Design -PART 1- Essential Skills!",
        //     "Wname": "PART 1- Essential Skills!",
        //     "price": 599,
        //     "oldprice": 2999,
        //     "discr": "How to Use Pattern Making Principals and Techniques to Draft and Manipulate Patterns to Create Your Fashion Design Ideas"
        //   },
        //   {
        //     "id": 95,
        //     "category": "Desine",
        //     "subcategory": "fashion_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2284600_278b_7.jpg",
        //     "name": "Sketching for Fashion Design ~ Beginner Course for Designers",
        //     "Wname": "Course for Designers",
        //     "price": 599,
        //     "oldprice": 2999,
        //     "discr": "Learn Step-by-Step Professional Fashion Drawing Techniques. Using Croquis, Plumb Lines, Body Movement, Shading, Folds et"
        //   },
  
  
  
        //   {
        //     "id": 96,
        //     "category": "Desine",
        //     "subcategory": "other_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/139210_3d00_5.jpg",
        //     "name": "Soundscaping for health, relationships and success",
        //     "Wname": "Julluan",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Unleash the power of sound to improve all your outcomes in life"
        //   },
        //   {
        //     "id": 97,
        //     "category": "Desine",
        //     "subcategory": "other_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/401998_6e4a.jpg",
        //     "name": "Crash Course Electronics and PCB Design",
        //     "Wname": "Andre rassul",
        //     "price": 599,
        //     "oldprice": 6999,
        //     "discr": "Learn Electronics and PCB Design from the Ground up with Altium CircuitMaker and Labcenter Proteus"
        //   },
        //   {
        //     "id": 98,
        //     "category": "Desine",
        //     "subcategory": "other_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/522596_f45e.jpg",
        //     "name": "Learn to Create Pixel Art for your Games",
        //     "Wname": "Benjamin",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Improve your pixel art with these simple techniques and principles."
        //   },
        //   {
        //     "id": 99,
        //     "category": "Desine",
        //     "subcategory": "other_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/722190_d52d_6.jpg",
        //     "name": "ESD - An Analog Design Viewpoint",
        //     "Wname": "Philip",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "How to apply ESD protection to analog/mixed signal ICs"
        //   },
        //   {
        //     "id": 100,
        //     "category": "Desine",
        //     "subcategory": "other_D",
        //     "image": "https://img-c.udemycdn.com/course/240x135/866712_8e4d.jpg",
        //     "name": "Electrical Power Equipment",
        //     "Wname": "Stephen",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how electrical equipments operate and how they fit together into a network"
        //   }, 
  
  
        //   ////////// for Marketing ////////
  
        //   {
        //     "id": 101,
        //     "category": "Marketing",
        //     "subcategory": "digital_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/27854_4103_4.jpg",
        //     "name": "Digital Marketing: 16 Strategic and Tactical Courses in 1",
        //     "Wname": "Oxfoard Learning",
        //     "price": 599,
        //     "oldprice": 6999,
        //     "discr": "Master DM: AI,SEO,TIK TOK, Social Media, Analytics, CRO, PPC, Email, WebCopy, UX, Content Marketing, E-commerce"
        //   },
        //   {
        //     "id": 102,
        //     "category": "Marketing",
        //     "subcategory": "digital_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/302746_4125_3.jpg",
        //     "name": "Digital Marketing: How to Generate Sales Leads",
        //     "Wname": "Lwarence",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn How To Generate Leads With A Step-By-Step Workbook & Action Plan To Boost Your Sales in 2019"
        //   },
        //   {
        //     "id": 103,
        //     "category": "Marketing",
        //     "subcategory": "digital_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/488130_e202_21.jpg",
        //     "name": "Digital Advertising and Marketing 101: The Complete Guide",
        //     "Wname": "Ben Silver",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Complete Digital Marketing Course: Social Media, Search, Video, Display, over 60,000 Students - Updated 2023"
        //   },
        //   {
        //     "id": 104,
        //     "category": "Marketing",
        //     "subcategory": "digital_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/745050_06c3.jpg",
        //     "name": "Digital Marketing Masterclass:Get Your First 1,000 Customers",
        //     "Wname": "Even Karmle",
        //     "price": 599,
        //     "oldprice": 6999,
        //     "discr": "How to acquire your first 1,000 customers using Social media, Content & Video Marketing, PR, SEO, SEM, FB, InstaG &more"
        //   },
        //   {
        //     "id": 105,
        //     "category": "Marketing",
        //     "subcategory": "digital_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/831548_8052_7.jpg",
        //     "name": "Fast & effective Landing Page course: Start converting today",
        //     "Wname": "Voko sibli",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to Design, Build & Publish high-converting landing pages in only 2 hours."
        //   },
  
  
  
        //   {
        //     "id": 106,
        //     "category": "Marketing",
        //     "subcategory": "media_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/27562_1a11_9.jpg",
        //     "name": "Social Media For Business Strategy",
        //     "Wname": "Oxfoard Learning",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Create a compelling mix with the latest Social Media Strategies. Achieve business growth goals stay ahead of competitors"
        //   },
        //   {
        //     "id": 107,
        //     "category": "Marketing",
        //     "subcategory": "media_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/242084_b4fd_10.jpg",
        //     "name": "2023 Facebook Marketing & Facebook Ads: 1000% More Growth",
        //     "Wname": "Allex",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master Facebook marketing and Facebook ads, and boost sharing and engagement. Lean about Facebook groups, pages, Pixel"
        //   },
        //   {
        //     "id": 108,
        //     "category": "Marketing",
        //     "subcategory": "media_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/403314_b091_3.jpg",
        //     "name": "Facebook Ads & Facebook Marketing MASTERY 2023 | Coursenvy ®",
        //     "Wname": " | Coursenvy ®",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Facebook Marketing from beginner to advanced! Join 200,000+ students who MASTERED Facebook and are Facebook Ads experts!"
        //   },
        //   {
        //     "id": 109,
        //     "category": "Marketing",
        //     "subcategory": "media_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/416874_bd6c_6.jpg",
        //     "name": "Pinterest Marketing for Business Growth: UPDATED for 2023",
        //     "Wname": "JC Marteji",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Beginner to Advanced Pinterest Marketing to increase sales today and for years to come! BEST SELLER since 2015!"
        //   },
        //   {
        //     "id": 110,
        //     "category": "Marketing",
        //     "subcategory": "media_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/450394_b942_8.jpg",
        //     "name": "Social Media Marketing - Complete Certificate Course",
        //     "Wname": "So Me",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The comprehensive social media course, beginner to advanced. Go viral, get started today"
        //   },
  
  
  
        //   {
        //     "id": 111,
        //     "category": "Marketing",
        //     "subcategory": "public_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2356538_211e_2.jpg",
        //     "name": "The Ultimate Public Relations Masterclass",
        //     "Wname": "Tj Walker",
        //     "price": 699,
        //     "oldprice": 5896,
        //     "discr": "How to build a PR strategy that generates leads, makes your brand famous, builds a community and attracts customers."
        //   },
        //   {
        //     "id": 112,
        //     "category": "Marketing",
        //     "subcategory": "public_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/285332_421c_7.jpg",
        //     "name": "Public Relations: Media Crisis Communications",
        //     "Wname": "TJ Walker",
        //     "price": 699,
        //     "oldprice": 5896,
        //     "discr": "Being able to Manage Crisis Communications"
        //   },
        //   {
        //     "id": 113,
        //     "category": "Marketing",
        //     "subcategory": "public_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/689296_dd18_3.jpg",
        //     "name": "Modern PR: How To Get Press Coverage For Your Business",
        //     "Wname": "Brade Mallin",
        //     "price": 699,
        //     "oldprice": 5896,
        //     "discr": "Build a narrative around your brand and succinctly articulate your story"
        //   },
        //   {
        //     "id": 114,
        //     "category": "Marketing",
        //     "subcategory": "public_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/363882_1582_3.jpg",
        //     "name": "Presentation Skills: Give a Great New Business Pitch",
        //     "Wname": "TJ Walker",
        //     "price": 699,
        //     "oldprice": 5896,
        //     "discr": "Avoid the most common blunders most people make in new business pitches"
        //   },
        //   {
        //     "id": 115,
        //     "category": "Marketing",
        //     "subcategory": "public_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/208456_3337_10.jpg",
        //     "name": "Press Coverage, Publicity & Public Relations For Branding",
        //     "Wname": "Relations For Branding",
        //     "price": 699,
        //     "oldprice": 5896,
        //     "discr": "Get on the radio, podcasts, online magazines, big blogs, and be promoted on big social media channels!!"
        //   },
  
  
  
        //   {
        //     "id": 116,
        //     "category": "Marketing",
        //     "subcategory": "content_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/176138_463f_15.jpg",
        //     "name": "Business Writing & Technical Writing Immersion",
        //     "Wname": "Satevere insrtoctor team",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Effective Writing | Technical Documentation | Writing System | Software Documentation | Emails | PPTs"
        //   },
        //   {
        //     "id": 117,
        //     "category": "Marketing",
        //     "subcategory": "content_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/325666_fe45_3.jpg",
        //     "name": "Copywriting secrets - How to write copy that sells",
        //     "Wname": "Scen kaye",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Discover the secrets of copywriting success from the master. From novice to pro in easy stages"
        //   },
        //   {
        //     "id": 118,
        //     "category": "Marketing",
        //     "subcategory": "content_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/669510_8c76_4.jpg",
        //     "name": "Copywriting Headline Masterclass",
        //     "Wname": "Valadimir",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Copywriting - Discover The Best Well-Kept Secrets Of The Most Famous Copywriters In The World About Writing A Headline"
        //   },
        //   {
        //     "id": 119,
        //     "category": "Marketing",
        //     "subcategory": "content_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/835336_5dc5_12.jpg",
        //     "name": "Blogging for a Living -  Perfect Small Budget Project",
        //     "Wname": "MC Author",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Make a full-time living or much more. In depth step-by-step blogging blueprint. Evergreen, beginner friendly, and fun!"
        //   },
        //   {
        //     "id": 120,
        //     "category": "Marketing",
        //     "subcategory": "content_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1323730_29d6.jpg",
        //     "name": "Viral Blogging 101: Blogging & Content Writing Masterclass",
        //     "Wname": "Tyler Speegle",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Step-by-step blogging & content writing guide. Go from blank page to viral blog post. Become a blog writing pro."
        //   },
  
  
  
        //   {
        //     "id": 121,
        //     "category": "Marketing",
        //     "subcategory": "product_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/496456_b94f_8.jpg",
        //     "name": "Bestseller Book Marketing: Amazon Kindle KDP Self-Publishing",
        //     "Wname": "Mr Allex",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "2023 Amazon book marketing & Kindle KDP self-publishing! Paperback books & Kindle (KDP) ebooks. Amazon Kindle KDP sales!"
        //   },
        //   {
        //     "id": 122,
        //     "category": "Marketing",
        //     "subcategory": "product_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/938386_1a58_7.jpg",
        //     "name": "B2B Sales Skills: LinkedIn Lead Generation, Cold Email Sales",
        //     "Wname": "Mr Alex",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "High-ticket B2B sales and marketing. Generate leads, sell to big companies, and win large deals. Learn sales skills!"
        //   },
        //   {
        //     "id": 123,
        //     "category": "Marketing",
        //     "subcategory": "product_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1539400_ad30_13.jpg",
        //     "name": "Product Management Marketing: Dekker's Product Marketing MBA",
        //     "Wname": "Dakker Freaser",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Be a Product Marketing Manager - Product Management : Product Manager MBA : Product to Market : Product Owner Launch GTM"
        //   },
        //   {
        //     "id": 124,
        //     "category": "Marketing",
        //     "subcategory": "product_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2047367_6e41_3.jpg",
        //     "name": "Product Marketing for Technology Companies",
        //     "Wname": "Lucas Baber",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master your product marketing skills through practical examples and exercises."
        //   },
        //   {
        //     "id": 125,
        //     "category": "Marketing",
        //     "subcategory": "product_M",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1539400_ad30_13.jpg",
        //     "name": "Product Marketing Launch Plan: Product GTM with Dekker, MBA",
        //     "Wname": "Dakker farear",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Product Management Marketing Strategy, Marketing Plan, Product Marketing Manager, Product Manager Marketing Plan"
        //   },
  
  
        //   ////////// for Lifestyle /////////
  
        //   {
        //     "id": 126,
        //     "category": "LifeStyle",
        //     "subcategory": "arts_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/72964_adf4_25.jpg",
        //     "name": "STRESS buster. Watercolor  painting to relax. Get the basics",
        //     "Wname": "Nicolla A",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Painting in watercolor to relax? Get BASICS Learn via play, See how the paints work, gain understanding & confidence."
        //   },
        //   {
        //     "id": 127,
        //     "category": "LifeStyle",
        //     "subcategory": "arts_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/137230_76b8_2.jpg",
        //     "name": "The Secrets to Drawing",
        //     "Wname": "Methew",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "A comprehensive video and ebook course designed for people wanting to learn the core concepts of drawing."
        //   },
        //   {
        //     "id": 128,
        //     "category": "LifeStyle",
        //     "subcategory": "arts_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/317978_cc81_3.jpg",
        //     "name": "Jewelry Making: Wire Wrapping for Beginners",
        //     "Wname": "Jessicca",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn to make beautiful handmade wire and gemstone jewellery to wear, give, or sell!"
        //   },
        //   {
        //     "id": 129,
        //     "category": "LifeStyle",
        //     "subcategory": "arts_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/381588_2e6d_4.jpg",
        //     "name": "The Colored Pencil Drawing Course",
        //     "Wname": "Methew",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Be familiar with common colored pencil surfaces and colored pencil types"
        //   },
        //   {
        //     "id": 130,
        //     "category": "LifeStyle",
        //     "subcategory": "arts_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/634744_e693.jpg",
        //     "name": "Sewing 101",
        //     "Wname": "Margaret Smith",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Building A Strong Sewing Foundation"
        //   },
  
  
  
        //   {
        //     "id": 131,
        //     "category": "LifeStyle",
        //     "subcategory": "beauty_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/398016_96cd_4.jpg",
        //     "name": "Make-up for Beginners: learn doing make-up like a Pro",
        //     "Wname": "Lana vallo",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Take your make-up skills to a completely new level. In-depth training for all make-up lovers"
        //   },
        //   {
        //     "id": 132,
        //     "category": "LifeStyle",
        //     "subcategory": "beauty_S",
        //     "image": "Natural Beauty: How to Make Lotions, Creams and Body Butters",
        //     "name": "Natural Beauty: How to Make Lotions, Creams and Body Butters",
        //     "Wname": "Jenniffer",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "How to create your own natural skincare lotions harnessing the power of healing plants for natural beauty and wellness"
        //   },
        //   {
        //     "id": 133,
        //     "category": "LifeStyle",
        //     "subcategory": "beauty_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2549721_b29c.jpg",
        //     "name": "Eyebrow Microblading Full course UPDATED",
        //     "Wname": "Kristiyana",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "From A to Z steps of performing eyebrow microblading treatment, accredited certificate possibility"
        //   },
        //   {
        //     "id": 134,
        //     "category": "LifeStyle",
        //     "subcategory": "beauty_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2589506_4f3d.jpg",
        //     "name": "Face Painting",
        //     "Wname": "Liz Byten",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "How to face paint for parties events and festivals"
        //   },
        //   {
        //     "id": 135,
        //     "category": "LifeStyle",
        //     "subcategory": "beauty_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2651938_83dc_2.jpg",
        //     "name": "Diploma in Luxury Facial, Facial Machines, Chemical Peeling",
        //     "Wname": "instute of Bueaty",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "CPDLearning Basic & Advanced techniques in facials with 5 stars client satisfaction everytime and achieve facial results"
        //   },
  
  
  
        //   {
        //     "id": 136,
        //     "category": "LifeStyle",
        //     "subcategory": "food_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/286450_1df2_4.jpg",
        //     "name": "#1 ITA Certified Tea Courses - Foundations of Chinese Tea",
        //     "Wname": "Sahana jang",
        //     "price": 2499,
        //     "oldprice": 6999,
        //     "discr": "ITA Certified Tea Course, true insider's tea knowledge of Chinese tea and global international tea industry. Tea Master"
        //   },
        //   {
        //     "id": 137,
        //     "category": "LifeStyle",
        //     "subcategory": "food_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/383612_5575_5.jpg",
        //     "name": "#2 Bake Artisan Sourdough Bread Like a Professional",
        //     "Wname": "Treesha L",
        //     "price": 2499,
        //     "oldprice": 6999,
        //     "discr": "Baking the best bread means baking real Sourdough Bread. NO KNEAD bread - video baking classes in your own home."
        //   },
        //   {
        //     "id": 138,
        //     "category": "LifeStyle",
        //     "subcategory": "food_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/465334_4dc1_8.jpg",
        //     "name": "Indian Culinary World - Master the art of Indian Cooking",
        //     "Wname": "Jyoti Sawant",
        //     "price": 2499,
        //     "oldprice": 6999,
        //     "discr": "Secrets of cooking delicious Indian food, from SizzlingPots - join 8000+ students in 125 countries in this masterclass!"
        //   },
        //   {
        //     "id": 139,
        //     "category": "LifeStyle",
        //     "subcategory": "food_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/541062_b2ff_6.jpg",
        //     "name": "Mix World-Class Cocktails - Secrets of a Champion Mixologist",
        //     "Wname": "paul Martin",
        //     "price": 2499,
        //     "oldprice": 6999,
        //     "discr": "Become a world-class cocktail mixer, guided by Paul Martin, the world's most prolific trainer of 30000+ bartenders"
        //   },
        //   {
        //     "id": 140,
        //     "category": "LifeStyle",
        //     "subcategory": "food_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/587486_d25f_4.jpg",
        //     "name": "#1 Sourdough Bread Baking 101",
        //     "Wname": "Tressa L",
        //     "price": 2499,
        //     "oldprice": 6999,
        //     "discr": "Bake your first real sourdough bread with coaching from an expert sourdough bread baker."
        //   },
  
  
  
        //   {
        //     "id": 141,
        //     "category": "LifeStyle",
        //     "subcategory": "pet_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/53424_d671_8.jpg",
        //     "name": "Dr. Ian Dunbar's SIRIUS® Dog Trainer Academy - All 4 Days",
        //     "Wname": "Ian Dunbar",
        //     "price": 2999,
        //     "oldprice": 6999,
        //     "discr": "Learn how to train dogs the SIRIUS® way! Learn how to run and promote your own dog-friendly dog training business."
        //   },
        //   {
        //     "id": 142,
        //     "category": "LifeStyle",
        //     "subcategory": "pet_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/320482_89ab_6.jpg",
        //     "name": "Dog CPR, First Aid + Safety for pet pros + dedicated owners",
        //     "Wname": "Melaineo",
        //     "price": 2955,
        //     "oldprice": 6999,
        //     "discr": "Essential training to keep your dogs safe, attract clients & gain skills & confidence to take action in an emergency."
        //   },
        //   {
        //     "id": 143,
        //     "category": "LifeStyle",
        //     "subcategory": "pet_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/456614_daf9_3.jpg",
        //     "name": "Dog Training - Become A Dog Trainer - Dog Training Career",
        //     "Wname": "Sarat Bolt",
        //     "price": 2254,
        //     "oldprice": 6999,
        //     "discr": "Turn dog training into an ideal career & become a professional dog trainer. Get the lifestyle you want & work with dogs"
        //   },
        //   {
        //     "id": 144,
        //     "category": "LifeStyle",
        //     "subcategory": "pet_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/614070_26bd_2.jpg",
        //     "name": "Crucial Concepts in Dog Behavior & Training",
        //     "Wname": "Ian Dunber",
        //     "price": 2566,
        //     "oldprice": 6999,
        //     "discr": "Learn cutting edge and common sense concepts that make dog training incredibly easy and effective"
        //   },
        //   {
        //     "id": 145,
        //     "category": "LifeStyle",
        //     "subcategory": "pet_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/626182_207f_2.jpg",
        //     "name": "Simple Solutions for Common Dog Behavior & Training Problems",
        //     "Wname": "Ian Dunbar",
        //     "price": 2899,
        //     "oldprice": 6999,
        //     "discr": "Learn to address house soiling, chewing, barking, digging, separation anxiety, jumping up, pulling on leash and more"
        //   },
  
  
  
        //   {
        //     "id": 146,
        //     "category": "LifeStyle",
        //     "subcategory": "travel_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/203644_b220_12.jpg",
        //     "name": "Travel Writing: Explore the World & Publish Your Stories!",
        //     "Wname": "Dev Fox",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to write professional-quality travel tales that readers (and editors) will love"
        //   },
        //   {
        //     "id": 147,
        //     "category": "LifeStyle",
        //     "subcategory": "travel_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/146636_3463_6.jpg",
        //     "name": "Travel Journaling: How to Write Extraordinary Travel Diaries",
        //     "Wname": "Dave Fox",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Find times to write that don't compromise your opportunities for exploring."
        //   },
        //   {
        //     "id": 148,
        //     "category": "LifeStyle",
        //     "subcategory": "travel_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/361978_1e2b_4.jpg",
        //     "name": "Mastering Airbnb | Learn from SF's top host, 100+ lectures",
        //     "Wname": "Even Kembrell",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Price your listing in a way that gets bookings without reviews"
        //   },
        //   {
        //     "id": 149,
        //     "category": "LifeStyle",
        //     "subcategory": "travel_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/3406942_56a9_3.jpg",
        //     "name": "Travel! The Ultimate Crash Course to Living on the Road",
        //     "Wname": "Bob Welles",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The Ultimate Crash Course to Living on the Road: How You Can Afford a Life of Travel and Adventure"
        //   },
        //   {
        //     "id": 150,
        //     "category": "LifeStyle",
        //     "subcategory": "travel_S",
        //     "image": "https://img-c.udemycdn.com/course/240x135/267962_0d73_5.jpg",
        //     "name": "TRAVEL Hacking for Beginners: Cheap, Smart & Safe Travel",
        //     "Wname": "Jimmy Nariyan",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Strategies To Cut Your Expense"
        //   },
  
  
        //   //////////// for Photography //////////////
  
        //   {
        //     "id": 151,
        //     "category": "Photography",
        //     "subcategory": "digital_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/138374_4359_5.jpg",
        //     "name": "Learn how to use your camera intuitively. Learn through doing rather than memorizing.",
        //     "Wname": "JP Teacheses",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to use your camera intuitively. Learn through doing rather than memorizing."
        //   },
        //   {
        //     "id": 152,
        //     "category": "Photography",
        //     "subcategory": "digital_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/291860_7947_3.jpg",
        //     "name": "Beginner Canon Digital SLR (DSLR) Photography",
        //     "Wname": "JP Teacheses",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to use your camera intuitively. Learn through doing rather than memorizing"
        //   },
        //   {
        //     "id": 153,
        //     "category": "Photography",
        //     "subcategory": "digital_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/387536_ca0e_5.jpg",
        //     "name": "Digital Photography for Beginners with DSLR cameras",
        //     "Wname": "Villers",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to take stunning photographs by mastering both the technical and creative sides of digital photography."
        //   },
        //   {
        //     "id": 154,
        //     "category": "Photography",
        //     "subcategory": "digital_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/419262_f69b_5.jpg",
        //     "name": "Photography - The Ultimate Guide to Using Off-Camera Flash",
        //     "Wname": "Bernie",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Follow me on 19 photo sessions & learn to create beautiful light using small flashes & take stunning dramatic portraits."
        //   },
        //   {
        //     "id": 155,
        //     "category": "Photography",
        //     "subcategory": "digital_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/921086_071e_2.jpg",
        //     "name": "The Ultimate Photography Course For Beginners",
        //     "Wname": "Jellis wevs",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn all the essentials of photography, and develop your skills to become an ultimate photographer yourself."
        //   },
  
  
  
  
        //   {
        //     "id": 156,
        //     "category": "Photography",
        //     "subcategory": "photo_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/288324_b847.jpg",
        //     "name": "Outstanding Composition: How to blow away your audience",
        //     "Wname": "Thomous",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to impress your followers with perfectly composed photographs which stand out in the crowd on every platform."
        //   },
        //   {
        //     "id": 157,
        //     "category": "Photography",
        //     "subcategory": "photo_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/656084_d9d0_2.jpg",
        //     "name": "Beginner Photography - Stunning DSLR Portraits!",
        //     "Wname": "Brayn lamb",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Easily & confidently learn manual mode DSLR photography!"
        //   },
        //   {
        //     "id": 158,
        //     "category": "Photography",
        //     "subcategory": "photo_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/840622_1ff1_3.jpg",
        //     "name": "Food Photography: Capturing Food in Your Kitchen",
        //     "Wname": "Fill Ebinar",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "With DIY Food Photography, you'll be taking better photos in no time with what you have in your own kitchen!"
        //   },
        //   {
        //     "id": 159,
        //     "category": "Photography",
        //     "subcategory": "photo_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1171588_ab12_9.jpg",
        //     "name": "Night Photography: Stunning Night Photography the Easy Way",
        //     "Wname": "Phil Ebniar",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn Night Photography, Astrophotography, Night Sky Photography! Follow Our Real World Journey to Capture Night Photos"
        //   },
        //   {
        //     "id": 160,
        //     "category": "Photography",
        //     "subcategory": "photo_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1185036_791b_3.jpg",
        //     "name": "Sports & Action Photography For Beginners",
        //     "Wname": "Don Mcpeak",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "A foundational course for beginner and novice level photographers who want to learn how to photograph dynamic subjects."
        //   },
  
  
  
        //   {
        //     "id": 161,
        //     "category": "Photography",
        //     "subcategory": "video_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/432902_9c4a_5.jpg",
        //     "name": "VIDEO EDITING. Techniques loved by pro broadcast filmmakers",
        //     "Wname": "Andhre St.Pierre",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Creative video editing techniques used by professionals and taught by a veteran, international award-winning editor."
        //   },
        //   {
        //     "id": 162,
        //     "category": "Photography",
        //     "subcategory": "video_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/640808_ca84_3.jpg",
        //     "name": "Cinematography Masterclass: Videography + Cinematography",
        //     "Wname": "Fill Abener",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Cinematography Masterclass: Video Production, Video Lighting, Filmmaking on Any Camera. Improve Your Cinematography"
        //   },
        //   {
        //     "id": 163,
        //     "category": "Photography",
        //     "subcategory": "video_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/675740_6bc4.jpg",
        //     "name": "Premiere Pro Lumetri: Color Correct like a Pro",
        //     "Wname": "Jordy",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn the essentials of color philosophy and perform technical color correction and grading tasks."
        //   },
        //   {
        //     "id": 164,
        //     "category": "Photography",
        //     "subcategory": "video_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/926512_6fdf_8.jpg",
        //     "name": "Adobe Premiere Pro CC Masterclass: Video Editing in Premiere",
        //     "Wname": "Fhil Abiner",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn Beginner-Advanced Adobe Premiere Pro Video Editing, Audio Editing, Color Grading, Motion Graphics, Green Screen+"
        //   },
        //   {
        //     "id": 165,
        //     "category": "Photography",
        //     "subcategory": "video_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/973762_010a_15.jpg",
        //     "name": "After Effects CC: The Ultimate Motion Graphics Masterclass",
        //     "Wname": "Kaversity",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Create Motion Graphics with Adobe After Effects CC: Become a Top Motion Graphics Designer in After Effects CC"
        //   },
  
  
  
        //   {
        //     "id": 166,
        //     "category": "Photography",
        //     "subcategory": "commerical_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/142490_7eb7_5.jpg",
        //     "name": "Mastering Architecture and Real Estate Photography",
        //     "Wname": "Chrlie",
        //     "price": 1999,
        //     "oldprice": 5888,
        //     "discr": "Start a business photographing real estate photography jobs for architects, builders, and real estate agents"
        //   },
        //   {
        //     "id": 167,
        //     "category": "Photography",
        //     "subcategory": "commerical_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/557386_009f_5.jpg",
        //     "name": "Wedding Photography: Complete Guide to Wedding Photography",
        //     "Wname": "Phil Abener ",
        //     "price": 1588,
        //     "oldprice": 4999,
        //     "discr": "Learn exactly how to become a wedding photographer, start a photo business of your own, and shoot better wedding photos"
        //   },
        //   {
        //     "id": 168,
        //     "category": "Photography",
        //     "subcategory": "commerical_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1416588_17ec_2.jpg",
        //     "name": "Real Estate Photography: How To Get Started",
        //     "Wname": "Greg Gottfried",
        //     "price": 1800,
        //     "oldprice": 5000,
        //     "discr": "Discover the secrets to starting a highly profitable real estate photo business. Taking Photos, Editing, Delivery etc."
        //   },
        //   {
        //     "id": 169,
        //     "category": "Photography",
        //     "subcategory": "commerical_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2400178_b478_2.jpg",
        //     "name": "Start Your Photography Business: A Photography Course",
        //     "Wname": "Fill Abener , Video School",
        //     "price": 1255,
        //     "oldprice": 6969,
        //     "discr": "A step-by-step guide to launching your own successful photography business!"
        //   },
        //   {
        //     "id": 170,
        //     "category": "Photography",
        //     "subcategory": "commerical_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/4895120_bcfa.jpg",
        //     "name": "Real Estate Photography Masterclass: Your Complete Guide",
        //     "Wname": "Phil Abener",
        //     "price": 1699,
        //     "oldprice": 7777,
        //     "discr": "You can capture & edit professional real estate photography & architecture photography with this easy-to-watch course!"
        //   },
  
  
  
        //   {
        //     "id": 171,
        //     "category": "Photography",
        //     "subcategory": "ptool_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/557194_faae_18.jpg",
        //     "name": "Master Adobe Lightroom Classic v12 & Lightroom CC v6 | 2023",
        //     "Wname": "Cris Parker",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "REVIEW: Every single tool inside Lightroom is perfectly explained. I definitely recommend this course.”"
        //   },
        //   {
        //     "id": 172,
        //     "category": "Photography",
        //     "subcategory": "ptool_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/697570_8598_11.jpg",
        //     "name": "Adobe Photoshop CC Essentials | Photoshop Retouching",
        //     "Wname": "Chris Parker",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "This Adobe Photoshop masterclass will teach you Photoshop retouching + photo editing. Bonus: 7 Photoshop courses in 1."
        //   },
        //   {
        //     "id": 173,
        //     "category": "Photography",
        //     "subcategory": "ptool_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/926234_4a1a_3.jpg",
        //     "name": "Adobe Lightroom Classic CC & CC: Photo Editing Masterclass",
        //     "Wname": "Phil Abiner",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Your complete guide to editing beautiful photos in Adobe Lightroom Classic CC and Adobe Lightroom CC, both versions!"
        //   },
        //   {
        //     "id": 174,
        //     "category": "Photography",
        //     "subcategory": "ptool_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1047320_6e1c_6.jpg",
        //     "name": "Professional Retouching Course in Photoshop",
        //     "Wname": "Marcin",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Photoshop Non-destructive Retouching Techniques. Learn Portrait, Beauty and Outdoor Retouching in Photoshop."
        //   },
        //   {
        //     "id": 175,
        //     "category": "Photography",
        //     "subcategory": "ptool_P",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1189136_2186_4.jpg",
        //     "name": "Adobe Lightroom Masterclass - Beginner to Expert",
        //     "Wname": "YouAccel",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn to Sort, Filter, Organize and Edit photos like a pro in this comprehensive guide to Adobe Lightroom"
        //   },
  
  
        //   ////////////////////////// for Music ///////////////////////
  
        //   {
        //     "id": 176,
        //     "category": "Music",
        //     "subcategory": "instrument_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/26956_8baf_4.jpg",
        //     "name": "Learn Guitar in 21 Days",
        //     "Wname": "TrueFire Guitar",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to play thousands of your favorite songs on guitar in just 3 weeks!"
        //   },
        //   {
        //     "id": 177,
        //     "category": "Music",
        //     "subcategory": "instrument_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/41884_8039_8.jpg",
        //     "name": "Acoustic Guitar and Electric Guitar Lessons: Getting Started",
        //     "Wname": "Erich Arendre",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Acoustic Guitar Theory, Fingerpicking, Fretting, Chords: Most Important 25 Videos For Getting Started w/ Playing Guita"
        //   },
        //   {
        //     "id": 178,
        //     "category": "Music",
        //     "subcategory": "instrument_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/42271_886a_9.jpg",
        //     "name": "Complete Guitar Lessons System - Beginner to Advanced",
        //     "Wname": "Erich",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "All-in-one Guitar Course, Fingerstyle Guitar, Blues Guitar, Acoustic Guitar, Electric Guitar & Fingerpicking Guitarra"
        //   },
        //   {
        //     "id": 179,
        //     "category": "Music",
        //     "subcategory": "instrument_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/174562_9df5_8.jpg",
        //     "name": "Learn to Play Saxophone: Beginner to Pro in Under Four Hours",
        //     "Wname": "Music proffecer",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master the art of Saxophone! Cover a year's worth of private lessons in just a few hours, for a fraction of the cost."
        //   },
        //   {
        //     "id": 180,
        //     "category": "Music",
        //     "subcategory": "instrument_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/174562_9df5_8.jpg ",
        //     "name": "Learn to Play the Trumpet: Beginner to Pro Made the Easy Way",
        //     "Wname": "Music Proffeces",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master the art of Trumpet! Cover a year's worth of private lessons in just a few hours and at a fraction of the cost."
        //   },
  
  
  
        //   {
        //     "id": 181,
        //     "category": "Music",
        //     "subcategory": "music_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/668594_1b1d_3.jpg",
        //     "name": "The Sound Kitchen - Great sound made easy",
        //     "Wname": "Timoteo",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Sound Engineering course for musicians, volunteers, professionals. For both beginners and people with some knowledge"
        //   },
        //   {
        //     "id": 182,
        //     "category": "Music",
        //     "subcategory": "music_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/786240_eb69_3.jpg",
        //     "name": "GarageBand Masterclass: GarageBand for Music Production",
        //     "Wname": "Jermmy",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn GarageBand for music production, music composition, music mixing, audio production, songwriting, and so much more!"
        //   },
        //   {
        //     "id": 183,
        //     "category": "Music",
        //     "subcategory": "music_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/826876_4fd1_6.jpg",
        //     "name": "Music + Audio Production in Logic Pro X - The Complete Guide",
        //     "Wname": "Make Pro Music",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Become a master at using Logic Pro X | Understand music production | Learn to record, edit & mix audio to a pro standard"
        //   },
        //   {
        //     "id": 184,
        //     "category": "Music",
        //     "subcategory": "music_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/890622_13c5_6.jpg",
        //     "name": "Film, TV, & Video Game Music Composition + Production Basics",
        //     "Wname": "Steven Melin",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "#1 Music Composition, Production, Technology, & Business Course"
        //   },
        //   {
        //     "id": 185,
        //     "category": "Music",
        //     "subcategory": "music_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/897192_2cee_12.jpg",
        //     "name": "Music Production in Logic Pro X - The Complete Course!",
        //     "Wname": "Thomus",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Join Successful Music Production + Logic Pro X students in Creating, Recording, Mixing Music + Mastering in Logic Pro X"
        //   },
  
  
  
        //   {
        //     "id": 186,
        //     "category": "Music",
        //     "subcategory": "vocal_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/70030_c4e7_8.jpg",
        //     "name": "Elite Singing Techniques - Phase I",
        //     "Wname": "Eric",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Step by step singing system proven to develop great technique and vocal mastery, Results are immediate!"
        //   },
        //   {
        //     "id": 187,
        //     "category": "Music",
        //     "subcategory": "vocal_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/211024_a2df_2.jpg",
        //     "name": "Be a Voice Actor: Making a Living with Your Voice",
        //     "Wname": "Laci Morgan",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn the tools and techniques to get started in the world of voiceovers"
        //   },
        //   {
        //     "id": 188,
        //     "category": "Music",
        //     "subcategory": "vocal_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/450918_4af0_3.jpg",
        //     "name": "How To Sing #1: Complete Vocal Warm ups & Voice Physiology",
        //     "Wname": "Roma",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Singing Lessons for Vocal Warm Up Tips & Voice Essentials"
        //   },
        //   {
        //     "id": 189,
        //     "category": "Music",
        //     "subcategory": "vocal_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1196834_541c_7.jpg",
        //     "name": "Fundamentals of Hindustani Classical Music",
        //     "Wname": "Surosri paul",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn Indian Classical Singing from scratch to advance; From Basic Notes & Rhythm to Introduction to The Ragas!"
        //   },
        //   {
        //     "id": 190,
        //     "category": "Music",
        //     "subcategory": "vocal_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1250174_48d9_14.jpg",
        //     "name": "BECOME A GREAT SINGER: Your Complete Vocal Training System",
        //     "Wname": "Robert",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Chris Cornell, Layne Staley, Geoff Tate and Ann Wilson all trained THESE techniques. You will be part of that legacy of training."
        //   },
  
  
  
        //   {
        //     "id": 191,
        //     "category": "Music",
        //     "subcategory": "msoftware_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/876844_bcb6_3.jpg",
        //     "name": "Avid Pro Tools 12 Fundamentals",
        //     "Wname": "infinite skills",
        //     "price": 1999,
        //     "oldprice": 6999,
        //     "discr": "Record, Edit and Mix Dialogue; Music and Sound Effects"
        //   },
        //   {
        //     "id": 192,
        //     "category": "Music",
        //     "subcategory": "msoftware_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1576666_d19b_3.jpg",
        //     "name": "Adobe Audition CC: The Beginner's Guide to Adobe Audition",
        //     "Wname": "Video School",
        //     "price": 2899,
        //     "oldprice": 6999,
        //     "discr": "Learn how to record, edit and mix audio in Adobe Audition CC with these easy-to-follow audio editing tutorials."
        //   },
        //   {
        //     "id": 193,
        //     "category": "Music",
        //     "subcategory": "msoftware_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1633746_c2c0.jpg",
        //     "name": "Logic Pro X 101 Masterclass - Logic Pro Music Production",
        //     "Wname": "Martin",
        //     "price": 5999,
        //     "oldprice": 6999,
        //     "discr": "Learn How To Create 10 Full Tracks With Logic Pro X From Scratch in This Logic Pro X Masterclass, Project Files Included"
        //   },
        //   {
        //     "id": 194,
        //     "category": "Music",
        //     "subcategory": "msoftware_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2018498_268a.jpg",
        //     "name": "FL Studio 21 - Music Production In FL Studio 21 for Mac & PC",
        //     "Wname": "Martin",
        //     "price": 3399,
        //     "oldprice": 6999,
        //     "discr": "Electronic Music Production in FL Studio 21 - 6 Full Tracks: Music Recording, Audio Editing, EQ & Mastering FL Studio 21"
        //   },
        //   {
        //     "id": 195,
        //     "category": "Music",
        //     "subcategory": "msoftware_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/3192102_f7cf_2.jpg",
        //     "name": "Audacity Bootcamp: Beginner to Advanced",
        //     "Wname": "Mike Admas",
        //     "price": 2799,
        //     "oldprice": 6999,
        //     "discr": "Audacity Bootcamp guides you beyond the basics of Audacity so you can edit your podcast with confidence and skill"
        //   },
  
  
  
        //   {
        //     "id": 196,
        //     "category": "Music",
        //     "subcategory": "mtechnique_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/355662_2977_14.jpg",
        //     "name": "Read Music FAST!",
        //     "Wname": "Benedict",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn to read music using my unique method: just see a note on a piano score and play it on the keyboard straight away"
        //   },
        //   {
        //     "id": 197,
        //     "category": "Music",
        //     "subcategory": "mtechnique_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1020830_a324_13.jpg",
        //     "name": "Music Theory for Electronic Producers - The Complete Course!",
        //     "Wname": "Thomus Grogia",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Join Successful students in Music Theory for Electronic Producers for Creating, Arranging, and Analysing Music Theory"
        //   },
        //   {
        //     "id": 198,
        //     "category": "Music",
        //     "subcategory": "mtechnique_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1958472_7909.jpg",
        //     "name": "Acoustic Guitar Redefined. Learn Chords, Rhythm and Melody!",
        //     "Wname": "Marko Chrillio",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to spice up basic chords, add simple melodies to chord progressions and learn easy percussive techniques"
        //   },
        //   {
        //     "id": 199,
        //     "category": "Music",
        //     "subcategory": "mtechnique_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2029644_1928.jpg",
        //     "name": "Acoustic Guitar System | Melodic Guitar Lessons for Beginner",
        //     "Wname": "Marco Chrillio",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Guitar Course Packed with Practical Guitar Lessons from Simple Fingerstyle Melodies to Beautiful Extended Chords"
        //   },
        //   {
        //     "id": 200,
        //     "category": "Music",
        //     "subcategory": "mtechnique_A",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2042418_41ff_11.jpg",
        //     "name": "The Complete DJ Course For Beginners 2023 | 2 Be A DJ",
        //     "Wname": "Jack Bradely",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Includes 20 FREE music tracks and 30 guided mix tutorials - You can mix along in real time with the exact same tracks"
        //   },
  
  
        //   //////////////////////////// for Health ////////////////////////
  
        //   {
        //     "id": 201,
        //     "category": "Health",
        //     "subcategory": "fitness_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/20305_2969_7.jpg",
        //     "name": "Pole Dancing Video Course with Noelle Wood",
        //     "Wname": "Dannis",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn beginner through expert pole dancing moves for fun and fitness from a champion instructor."
        //   },
        //   {
        //     "id": 202,
        //     "category": "Health",
        //     "subcategory": "fitness_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/230066_632a_6.jpg",
        //     "name": "Exercise Physiology",
        //     "Wname": "J J Mayo",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how the body systems work in concert during acute and chronic exercise."
        //   },
        //   {
        //     "id": 203,
        //     "category": "Health",
        //     "subcategory": "fitness_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/549518_da6b.jpg",
        //     "name": "Fitness For Beginners",
        //     "Wname": "Jothan",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "You will learn the basic and important exercise movements that all exercises are based off of and get the appropriate progressions for you"
        //   },
        //   {
        //     "id": 204,
        //     "category": "Health",
        //     "subcategory": "fitness_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/604572_bf25_3.jpg",
        //     "name": "Ultimate Guide to Running - for beginners to experts",
        //     "Wname": "Mathew",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Let us join you on a journey through the world of running. Learn skills and techniques to achieve your running goals."
        //   },
        //   {
        //     "id": 205,
        //     "category": "Health",
        //     "subcategory": "fitness_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/626912_5340_9.jpg",
        //     "name": "Learn Pilates: Classical Mat - Beginner to Advanced",
        //     "Wname": "Josie",
        //     "price": 2833,
        //     "oldprice": 6999,
        //     "discr": "Pilates will transform your body, improve your posture, health & wellbeing, core strength, mobility and flexibility"
        //   },
  
  
  
        //   {
        //     "id": 206,
        //     "category": "Health",
        //     "subcategory": "sport_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/40730_91f4_7.jpg",
        //     "name": "The Perfect Golf Swing - Timeless Golf Instruction",
        //     "Wname": "Zim McLellen",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Absolutely the best golf videos ever made, period. 99% of golf instruction is utter nonsense."
        //   },
        //   {
        //     "id": 207,
        //     "category": "Health",
        //     "subcategory": "sport_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/255024_539a_3.jpg",
        //     "name": "Table tennis for beginners",
        //     "Wname": "Tom Lodziak",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn how to play table tennis. Course covers basic strokes, drills, serves + more. Easy to follow video instruction."
        //   },
        //   {
        //     "id": 208,
        //     "category": "Health",
        //     "subcategory": "sport_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1041352_c116.jpg",
        //     "name": "Elevate Your Tennis Game: Learn from Champion Andre Agassi",
        //     "Wname": "Andre Agassi",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Level up your tennis game with the next best thing to a private lesson. Master insider secrets and a winner’s mindset."
        //   },
        //   {
        //     "id": 209,
        //     "category": "Health",
        //     "subcategory": "sport_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1519038_4b37.jpg",
        //     "name": "Sport Psychology for Athletes",
        //     "Wname": "Chris",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master the fundamentals of sport psychology to improve performance and gain a mental edge"
        //   },
        //   {
        //     "id": 210,
        //     "category": "Health",
        //     "subcategory": "sport_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1971698_5144_4.jpg",
        //     "name": "Total Immersion Swimming: Swim Better, Easier, Faster!",
        //     "Wname": "Expert Academy",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Official Course: Total Immersion head coach Terry Laughlin teaches you how to swim faster and further using less effort"
        //   },
  
  
  
        //   {
        //     "id": 211,
        //     "category": "Health",
        //     "subcategory": "yoga_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/8139_bbe5_11.jpg",
        //     "name": "14-Day Yoga Detox and Empowerment Course",
        //     "Wname": "Sadie",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Lose weight, get healthier and fit on all levels in just 14 days with Sadie Nardini"
        //   },
        //   {
        //     "id": 212,
        //     "category": "Health",
        //     "subcategory": "yoga_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/39207_dd17_7.jpg",
        //     "name": "Prenatal Yoga",
        //     "Wname": "Ceristelle",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Keep your Body Fit and Your Baby Healthy"
        //   },
        //   {
        //     "id": 213,
        //     "category": "Health",
        //     "subcategory": "yoga_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/253326_a442_10.jpg",
        //     "name": "15 Minutes x 15 Days Yoga Flexibility Challenge",
        //     "Wname": "Ab carver",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Improve your flexibility, reduce morning stiffness and alleviate recurring aches and pains in 15 minutes a day."
        //   },
        //   {
        //     "id": 214,
        //     "category": "Health",
        //     "subcategory": "yoga_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/266154_974d_3.jpg",
        //     "name": "15 Minutes x 15 Days Yoga Strength Challenge",
        //     "Wname": "Ab carver",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Increase strength and stability in your upper body, core and lower body in 15-minute daily yoga sessions."
        //   },
        //   {
        //     "id": 215,
        //     "category": "Health",
        //     "subcategory": "yoga_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/273758_395c_4.jpg",
        //     "name": "15 Minutes x 15 Days Total Yoga Challenge",
        //     "Wname": "AB Carver",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Improve your flexibility, build core strength, alleviate aches and pains and reduce your stress in 15 minutes a day!"
        //   },
  
  
  
        //   {
        //     "id": 216,
        //     "category": "Health",
        //     "subcategory": "mhealth_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/327288_0184_2.jpg",
        //     "name": "CBT for Psychosis",
        //     "Wname": "Ron Unger",
        //     "price": 999,
        //     "oldprice": 6999,
        //     "discr": "Use evidence-based CBT approaches to reduce distress and disability related to psychotic experiences."
        //   },
        //   {
        //     "id": 217,
        //     "category": "Health",
        //     "subcategory": "mhealth_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/516832_d385.jpg",
        //     "name": "CBT4PANIC. Overcome Panic & Anxiety attacks fast",
        //     "Wname": "Robin Hall",
        //     "price": 4999,
        //     "oldprice": 6999,
        //     "discr": "A complete professional Cognitive Behavioural Therapy (CBT) treatment plan for anxiety and panic disorder."
        //   },
        //   {
        //     "id": 218,
        //     "category": "Health",
        //     "subcategory": "mhealth_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/660344_797d_5.jpg",
        //     "name": "Providing Trauma-Informed Care",
        //     "Wname": "Dron Kronp",
        //     "price": 3333,
        //     "oldprice": 6999,
        //     "discr": "Exploring psychological trauma and how to provide care and compassion to trauma survivors"
        //   },
        //   {
        //     "id": 219,
        //     "category": "Health",
        //     "subcategory": "mhealth_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/777172_4ba8_4.jpg",
        //     "name": "Working with Trauma, Dissociation, and Psychosis",
        //     "Wname": "Ron Unger",
        //     "price": 1999,
        //     "oldprice": 6999,
        //     "discr": "CBT and Other Approaches to Understanding and Recovery"
        //   },
        //   {
        //     "id": 220,
        //     "category": "Health",
        //     "subcategory": "mhealth_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/870998_9f50_6.jpg",
        //     "name": "CBT for Depression, Anxiety, Phobias and Panic Attacks",
        //     "Wname": "Libby Seer",
        //     "price": 2299,
        //     "oldprice": 6999,
        //     "discr": "Cognitive Behavioural Therapy for Depression, Anxiety, Phobias and Panic Attacks"
        //   },
  
  
  
        //   {
        //     "id": 221,
        //     "category": "Health",
        //     "subcategory": "dance_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/282722_1650_4.jpg",
        //     "name": "Poi Dancing: The Beginner Series",
        //     "Wname": "Nick Wolsey",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn and Master the Fundamentals of Poi with Nick Woolsey"
        //   },
        //   {
        //     "id": 222,
        //     "category": "Health",
        //     "subcategory": "dance_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/393732_7789_4.jpg",
        //     "name": "Hip Hop Dance For Beginners",
        //     "Wname": "Emroyee",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn 14 Beginning Hip Hop Dance Routines Without Stepping Foot In a Dance Studio"
        //   },
        //   {
        //     "id": 223,
        //     "category": "Health",
        //     "subcategory": "dance_H",
        //     "image": "https://img-c.udemycdn.com/course/480x270/1407790_cefd.jpg",
        //     "name": "Shuffle Dance Master Class Vol 1. | How to Shuffle Dance",
        //     "Wname": "Brain Bee",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The step-by-step system for learning how to Shuffle dance (Cutting Shapes, EDM Dancing)"
        //   },
        //   {
        //     "id": 224,
        //     "category": "Health",
        //     "subcategory": "dance_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/2318150_4748_3.jpg",
        //     "name": "Kundalini Dance: Sacred Movements To Activate The Chakras",
        //     "Wname": "Mark Kene",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The step-by-step system for learning how to Shuffle dance (Cutting Shapes, EDM Dancing)"
        //   },
        //   {
        //     "id": 225,
        //     "category": "Health",
        //     "subcategory": "dance_H",
        //     "image": "https://img-c.udemycdn.com/course/240x135/3909716_689b_2.jpg",
        //     "name": "Belly Dance for Beginners: Technique and Combinations",
        //     "Wname": "Kasun",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Master Belly dancing techniques with step by step instructions and dance practices full of fun!"
        //   },
  
  
        //   ///////////////////////////////// for Acadeemic ////////////////////////////////
  
        //   {
        //     "id": 226,
        //     "category": "Academic",
        //     "subcategory": "engineer_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/655940_ef77_2.jpg",
        //     "name": "Electricity & electronics - Robotics, learn by building",
        //     "Wname": "Ian Juby",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Over 31,000 enrolled! Open career opportunities and have fun learning electronics focused on building robots/automation!"
        //   },
        //   {
        //     "id": 227,
        //     "category": "Academic",
        //     "subcategory": "engineer_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/671782_68b2_2.jpg",
        //     "name": "RF / Antenna Fundamentals",
        //     "Wname": "Hank Ott",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Applications in 802.11 WiFi"
        //   },
        //   {
        //     "id": 228,
        //     "category": "Academic",
        //     "subcategory": "engineer_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/683406_af01_4.jpg",
        //     "name": "Electrical Power Engineering Principles",
        //     "Wname": "Stephen",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "know the difference between alternating current and direct current"
        //   },
        //   {
        //     "id": 229,
        //     "category": "Academic",
        //     "subcategory": "engineer_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/706086_c24a_2.jpg",
        //     "name": "Electronics - for Complete Beginners",
        //     "Wname": "GeneL",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "You'll be familiar with the terminology and physical principles that form the basis of electronics technology."
        //   },
        //   {
        //     "id": 230,
        //     "category": "Academic",
        //     "subcategory": "engineer_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/1070622_e42a_12.jpg",
        //     "name": "MATLAB/Simulink - Simulink Course for Electrical Engineering",
        //     "Wname": "Rejk A",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn basics of MATLAB Simulink to simulate different electric components in MATLAB Simulink for electrical engineering"
        //   },
  
  
  
        //   {
        //     "id": 231,
        //     "category": "Academic",
        //     "subcategory": "maths_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/51334_ec30.jpg",
        //     "name": "Introduction to Probability and Statistics",
        //     "Wname": "Dane MC",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Students will learn probability and basic techniques of data analysis and inference. Students will gain a deeper understanding of the underlying concepts."
        //   },
        //   {
        //     "id": 232,
        //     "category": "Academic",
        //     "subcategory": "maths_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/116286_a3bd_10.jpg",
        //     "name": "Workshop in Probability and Statistics",
        //     "Wname": "George",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "This workshop will teach you the fundamentals of statistics in order to give you a leg up at work or in school."
        //   },
        //   {
        //     "id": 233,
        //     "category": "Academic",
        //     "subcategory": "maths_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/117490_5ea3_12.jpg",
        //     "name": "Become a Calculus 1 Master",
        //     "Wname": "Krista King",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Limits & Continuity, including how to solve every kind of limit problem, and how to find discontinuities in a functio"
        //   },
        //   {
        //     "id": 234,
        //     "category": "Academic",
        //     "subcategory": "maths_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/128298_f05a_7.jpg",
        //     "name": "Become a Calculus 2 Master",
        //     "Wname": "Krista King",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn everything from Calculus 2, then test your knowledge with 830+ practice questions"
        //   },
        //   {
        //     "id": 235,
        //     "category": "Academic",
        //     "subcategory": "maths_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/128300_2f33_6.jpg",
        //     "name": "Become a Calculus 3 Master",
        //     "Wname": "Krista King",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Partial Derivatives, including higher order partial derivatives, multivariable chain rule and implicit differentiation"
        //   },
  
  
  
        //   {
        //     "id": 236,
        //     "category": "Academic",
        //     "subcategory": "science_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/88718_852e_14.jpg",
        //     "name": "Quantum Physics: an overview of a weird world (Basics)",
        //     "Wname": "Marco masi",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "A primer on the conceptual foundations of Quantum Physics"
        //   },
        //   {
        //     "id": 237,
        //     "category": "Academic",
        //     "subcategory": "science_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/359046_8804_5.jpg",
        //     "name": "Introductory Biology",
        //     "Wname": "Thomus Aman",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Life around us is simply amazing. I'll show you why."
        //   },
        //   {
        //     "id": 238,
        //     "category": "Academic",
        //     "subcategory": "science_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/453796_f5fa.jpg",
        //     "name": "The Beginners Course for Clinical Research",
        //     "Wname": "Vera",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "The Essentials of Clinical Trials - Clinical Research for Beginners"
        //   },
        //   {
        //     "id": 239,
        //     "category": "Academic",
        //     "subcategory": "science_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/576688_21c9_8.jpg",
        //     "name": "Introduction to Medical Imaging",
        //     "Wname": "Muyinatu",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Your guide to the history, science, math, and economics of medical imaging systems (e.g., X-ray, CT, MRI, Ultrasound)"
        //   },
        //   {
        //     "id": 240,
        //     "category": "Academic",
        //     "subcategory": "science_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/662920_2915_3.jpg",
        //     "name": "The Simplest & Easiest Course on Hypothesis Testing",
        //     "Wname": "David ten",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Easiest Beginners Course on Statistics for Newbies! Perfect for university and college levels!"
        //   },
  
  
  
        //   {
        //     "id": 241,
        //     "category": "Academic",
        //     "subcategory": "social_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/227592_752c_5.jpg",
        //     "name": "Global Environmental Problems: Surveying the Human Footprint",
        //     "Wname": "Brain MCcabe",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "This course will use broad, geographic discussions and case studies to help students understand environmental problems."
        //   },
        //   {
        //     "id": 242,
        //     "category": "Academic",
        //     "subcategory": "social_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/398980_ffe8.jpg",
        //     "name": "The economic model of emerging countries - Michael Spence",
        //     "Wname": "EDOOTV",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Understanding Economics. Learn how the world works and why it is the way it it."
        //   },
        //   {
        //     "id": 243,
        //     "category": "Academic",
        //     "subcategory": "social_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/497736_5c54.jpg",
        //     "name": "Learn Social Psychology",
        //     "Wname": "Andrew L",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Understand How People Think, Feel, and Behave in this Complete Introduction to Social Psychology"
        //   },
        //   {
        //     "id": 244,
        //     "category": "Academic",
        //     "subcategory": "social_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/508508_b2ca_2.jpg",
        //     "name": "Understand the Mind: 15 Fascinating Psychology Studies",
        //     "Wname": "Andrew L",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Learn About the Human Mind Through the Research in Social Psychological Science"
        //   },
        //   {
        //     "id": 245,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/543210_e8b4_2.jpg",
        //     "name": "Learn Social Psychology - The Self & Self-Esteem",
        //     "Wname": "Andrew W",
        //     "price": 699,
        //     "oldprice": 6999,
        //     "discr": "Understand Psychology for Personal Development, Self-Discovery, Business, Entrepreneurship, and Team-Building"
        //   },
  
  
  
        //   {
        //     "id": 246,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/18181_f6ad_9.jpg",
        //     "name": "Classroom Management Essentials",
        //     "Wname": "Tracey Garrett",
        //     "price": 1099,
        //     "oldprice": 6999,
        //     "discr": "Learn how to manage your classroom and spend more time teaching rather than disciplining"
        //   },
        //   {
        //     "id": 247,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/27698_c0d7_3.jpg",
        //     "name": "Learning How to Learn",
        //     "Wname": "Donna Cercone",
        //     "price": 999,
        //     "oldprice": 6999,
        //     "discr": "Becoming your own Brain Mechanic - Know how to keep your genius mind open."
        //   },
        //   {
        //     "id": 248,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/44897_8155_5.jpg",
        //     "name": "How to Become a Life Coach - Is Training Needed?",
        //     "Wname": "Maia Berens",
        //     "price": 3499,
        //     "oldprice": 6999,
        //     "discr": "Life coach education requirements. Learn how to work with clients, overcome resistance, change mindset, fees, marketing."
        //   },
        //   {
        //     "id": 249,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/137188_eb3a_15.jpg",
        //     "name": "Train the Trainer Foundation: Adult Education Mastery Course",
        //     "Wname": "Jason Teyeak",
        //     "price": 2799,
        //     "oldprice": 6999,
        //     "discr": "Deploy a repeatable system for employee learning to ensure you reach every learner…every time."
        //   },
        //   {
        //     "id": 250,
        //     "category": "Academic",
        //     "subcategory": "traning_T",
        //     "image": "https://img-c.udemycdn.com/course/240x135/137216_9f38_20.jpg",
        //     "name": "Train the Trainer 101: For Beginners Only!",
        //     "Wname": "Json teteak",
        //     "price": 1699,
        //     "oldprice": 6999,
        //     "discr": "Quickly go from trainee to trainer using The Rule the Room training method: How to Train Anything to Anyone"
        //   }
        // ]

        console.log("RequestData:", productDetails);
        const adddata = await productModel.create(productDetails);
        console.log(adddata);
        res.send("added Successfully");
    }catch(err){
        console.log("Error in adding Product", err);
    }
}

const finddata = async(req, res) => {
    const find = await productModel.find({});
    console.log(find);
    res.send (find)
}

module.exports = {productController, finduser, addProduct, finddata, addcart, findProduct, searchProduct, addOrder,findOrder};