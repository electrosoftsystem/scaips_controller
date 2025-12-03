import { Mail } from "lucide-react";


function ContactCTASection({ profile}) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">       

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Let's Work Together
        </h2>


        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities.
        </p>

        {/* Contact + Download Buttons in same row */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a
            href={`mailto:${profile?.email}`}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Mail size={20} />
            <span>Get In Touch</span>
          </a>

        </div>
      </div>
    </section>
  );
}

export default ContactCTASection;
