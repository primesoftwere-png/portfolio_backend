const Inquiry = require("../model/Inquiry.model");
const sendMail = require("../utils/sendMail");

/**
 * METHOD: GET, POST
 * ROUTE: /api/inquiry
 */
exports.inquiryHandler = async (req, res) => {
  try {
    /* ================= GET ================= */
    if (req.method === "GET") {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: inquiries,
      });
    }

    /* ================= POST ================= */
    if (req.method === "POST") {
      const { name, email, services, projectDetail } = req.body;

      if (!name || !email || !services || !projectDetail) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const inquiry = await Inquiry.create({
        name,
        email,
        services,
        projectDetail,
      });

      // Try to send email, respond with error if mail fails
      try {
        await sendMail({ name, email, services, projectDetail });
        res.status(201).json({
          success: true,
          message: "Inquiry submitted successfully",
          data: inquiry,
        });
      } catch (mailError) {
        console.error("Mail failed:", mailError);
        // Optionally, you can delete the inquiry if mail fails
        // await Inquiry.findByIdAndDelete(inquiry._id);
        return res.status(500).json({
          success: false,
          message: "Inquiry saved but failed to send email. Please try again later.",
        });
      }
      return;
    }

    /* ================= INVALID METHOD ================= */
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Inquiry API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
