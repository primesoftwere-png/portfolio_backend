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

      // Send response immediately
      res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        data: inquiry,
      });

      // Send email in background (do not block response)
      sendMail({ name, email, services, projectDetail })
        .catch(mailError => {
          console.error("Mail failed:", mailError.message);
        });
      return; // Prevent further code execution
    }

    /* ================= INVALID METHOD ================= */
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Inquiry API Error:", error);
      res.status(200).json({
        success: true,
        data: inquiries,
      });
      return; // Prevent further code execution
  }
};
