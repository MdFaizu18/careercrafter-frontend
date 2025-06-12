import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react'; // Optional icon

const QuickAdviceBox = () => {
  const [showAdvice, setShowAdvice] = useState(true);

  return (
    <>
      {showAdvice && (
        <div className="mt-10 flex items-center justify-between rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-4 shadow-md transition-opacity duration-300">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-green-700">Quick Advice</h4>
              <p className="text-sm text-green-800">
                Keep your LinkedIn profile updated—recruiters check it more often than you think.
              </p>
            </div>
          </div>
          <button
            className="ml-4 text-sm text-green-600 hover:text-green-800"
            onClick={() => setShowAdvice(false)}
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default QuickAdviceBox;
