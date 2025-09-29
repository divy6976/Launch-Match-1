import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // For now, just simulate success locally. Hook up to backend/email later.
      await new Promise((r) => setTimeout(r, 500));
      setSent(true);
    } catch (e) {
      setError("Could not send your message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700 border border-blue-100">
            <span className="text-xs font-semibold tracking-wide">Contact Us</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">We'd love to hear from you</h1>
          <p className="text-sm text-gray-600 mt-2">Have a question, feature idea, or partnership? Send us a message.</p>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-xl border-0 p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">✓</div>
              <h2 className="text-xl font-bold text-gray-900">Message sent!</h2>
              <p className="text-gray-600 mt-1">Thanks for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="John Doe" className="h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="How can we help?" className="h-11" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea id="message" name="message" value={form.message} onChange={onChange} placeholder="Write your message..." className="min-h-32" required />
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button type="submit" className="h-11 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">Send Message</Button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-5 shadow border border-gray-100">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-semibold text-gray-800">support@firstusers.app</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow border border-gray-100">
            <p className="text-xs text-gray-500">Twitter</p>
            <p className="text-sm font-semibold text-gray-800">@firstusers</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow border border-gray-100">
            <p className="text-xs text-gray-500">Hours</p>
            <p className="text-sm font-semibold text-gray-800">Mon–Fri, 9am–6pm IST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


