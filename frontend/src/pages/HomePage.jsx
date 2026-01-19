import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimit from '../components/RateLimit'
import NoteCard from '../components/NoteCard'
import toast from 'react-hot-toast'
import api from '../../lib/axios'
import { Link } from 'react-router'
import { Sparkles } from "lucide-react"
import AiChat from '../components/AiChat'
const HomePage = () => {
  const [isRateLimit, setRateLimit] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
 const [Open , seIsOpen]= useState(false)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
        setRateLimit(false)
      } catch (error) {
        if (error.response?.status === 429) {
          setRateLimit(true)
        } else {
          toast.error('Failed to load notes')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])


  const toggleChat = () => {
    seIsOpen(!Open)
  }
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {isRateLimit && <RateLimit />}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20 text-base-content/60">
            <span>Loading <span className="loading loading-bars loading-xs"></span></span>
          </div>
        )}

        {/* Empty */}
        {!loading && notes.length === 0 && !isRateLimit && (
<div className="flex flex-col items-center justify-center py-24 text-center">
  <p className="text-base font-medium text-base-content">
    No notes available
  </p>

  <p className="mt-1 text-sm text-base-content/60">
    Create a new note to get started
  </p>

  <Link
    to="/create"
    className="btn btn-primary btn-sm mt-6"
  >
    Create note
  </Link>
</div>


        )}

        {/* Notes */}
        {!loading && notes.length > 0 && !isRateLimit && (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </section>
        )}
      </main>
    
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  
  {/* Chat window */}
  {Open && (
    <div className="mb-1">
      <AiChat />
    </div>
  )}

  {/* Floating button */}
  <button
    onClick={toggleChat}
    className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
  >
    <Sparkles className="w-5 h-5 text-gray-700" />
  </button>

</div>

    </div>
  )
}

export default HomePage
