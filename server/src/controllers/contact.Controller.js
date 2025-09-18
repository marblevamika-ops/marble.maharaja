import Contact from '../module/Contact.Module.js'; // Adjust path as needed

export const submitContactForm = async (req, res) => {
    const { fullName, email, phone, country, message } = req.body;

    if (!fullName || !email || !phone || !country || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newContact = new Contact({
            fullName,
            email,
            phone,
            country,
            message
        });

        await newContact.save();

        return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
        console.error("Error saving form data:", error.message);
        return res.status(500).json({ error: "Internal server error. when you submit the contact form." });
    }
};

export const getAllContactForm = async (req, res) => {
    try {
        const allContacts = await Contact.find().sort({ submittedAt: -1 });
        return res.status(200).json({
            success: true,
            messages: allContacts
        });
    } catch (error) {
        console.error("Error get form data : ", error.message);
        return res.status(500).json({ success: false, error: "Internal server error when fetching contact messages." });
    }
}
