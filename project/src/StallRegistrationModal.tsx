import { useState, ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';

interface StallFormData {
  stallName: string;
  stallOwner: string;
  email: string;
  phone: string;
  cuisineType: string;
  stallRequirements: string;
}

interface StallRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const StallRegistrationModal = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}: StallRegistrationModalProps) => {
  const [formData, setFormData] = useState<StallFormData>({
    stallName: '',
    stallOwner: '',
    email: '',
    phone: '',
    cuisineType: '',
    stallRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('https://recrave.vercel.app/api/v1/registerStall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess('✅ Stall registered successfully!');
        setFormData({
          stallName: '',
          stallOwner: '',
          email: '',
          phone: '',
          cuisineType: '',
          stallRequirements: '',
        });
        onClose();
      } else {
        onError('❌ Failed to register stall: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      onError('⚠️ Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-orange-500/20 shadow-2xl animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Register Your Stall
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">
            Join ReCrave 2025 and showcase your culinary excellence
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Stall Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stallName"
                value={formData.stallName}
                onChange={handleChange}
                required
                placeholder="Enter your stall name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stallOwner"
                value={formData.stallOwner}
                onChange={handleChange}
                required
                placeholder="Enter owner name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Cuisine Type
            </label>
            <input
              type="text"
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              placeholder="e.g., Italian, Chinese, Indian, Fast Food"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Stall Requirements
            </label>
            <textarea
              name="stallRequirements"
              value={formData.stallRequirements}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your stall requirements (space, equipment, utilities, etc.)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Registering...' : 'Register Stall'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StallRegistrationModal;