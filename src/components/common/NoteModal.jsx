import { X } from 'lucide-react';

const NoteModal = ({ selectedApplication, noteText, setNoteText, closeNoteModal, saveNote }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
      <div className="p-8">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedApplication?.notes ? 'Edit Note' : 'Add Note'}
          </h2>
          <button
            onClick={closeNoteModal}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            rows="6"
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            placeholder="Add notes about this application, interviews, follow-ups, or any other relevant information..."
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={closeNoteModal}
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={saveNote}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  </div>
);
