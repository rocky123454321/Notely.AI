import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import NoteCard from "../components/NoteCard";
import AiChat from "../components/AiChat";
import Modal from "../components/modal";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimit, setRateLimit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const chatRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notes (example)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
        setRateLimit(false);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Modal />
      <Navbar />

      {isRateLimit && <RateLimit />}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center py-20 text-base-content/60">
            <span>
              Loading <span className="loading loading-bars loading-xs"></span>
            </span>
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimit && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-base font-medium text-base-content">
              No notes available
            </p>
            <p className="mt-1 text-sm text-base-content/60">
              Create a new note to get started
            </p>
            <Link to="/create" className="btn btn-primary btn-sm mt-6">
              Create note
            </Link>
          </div>
        )}

        {!loading && notes.length > 0 && !isRateLimit && (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </section>
        )}
      </main>

      {/* Floating Chat + Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div
            ref={chatRef}
            className="mb-1 w-80 sm:w-96 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
          >
            <AiChat />
          </div>
        )}

        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition"
        >
          <Sparkles className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
