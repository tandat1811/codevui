import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer('')

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistral-community/Mistral-7B-Instruct-v0.2',
        {
          headers: { Authorization: `Bearer hf_${Date.now()}` }, // Note: Use your actual HF token
          method: 'POST',
          body: JSON.stringify({ inputs: question }),
        }
      )

      const result = await response.json()
      
      if (result[0]?.generated_text) {
        const generatedText = result[0].generated_text
        // Extract only the answer part (remove the input question)
        const answerText = generatedText.replace(question, '').trim()
        setAnswer(answerText || 'Không thể tạo câu trả lời. Vui lòng thử lại.')
      } else {
        setAnswer('Có lỗi xảy ra. Vui lòng thử lại sau.')
      }
    } catch (error) {
      setAnswer(`Lỗi: ${error.message}. Vui lòng kiểm tra kết nối internet.`)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAsk()
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Hướng Dẫn Sử Dụng AI</h1>
      </header>
      <main>
        <section>
          <h2>Giới Thiệu Về AI</h2>
          <p>Trí tuệ nhân tạo (AI) là một lĩnh vực của khoa học máy tính tập trung vào việc tạo ra các máy móc có khả năng thực hiện các nhiệm vụ đòi hỏi trí tuệ của con người. AI có thể học hỏi, suy luận và giải quyết vấn đề.</p>
        </section>
        <section>
          <h2>Cách Sử Dụng AI</h2>
          <p>Để sử dụng AI hiệu quả:</p>
          <ul>
            <li>Xác định vấn đề bạn muốn giải quyết.</li>
            <li>Chọn công cụ AI phù hợp (như ChatGPT, DALL-E, v.v.).</li>
            <li>Cung cấp dữ liệu đầu vào rõ ràng và chính xác.</li>
            <li>Đánh giá và tinh chỉnh kết quả.</li>
          </ul>
        </section>
        <section>
          <h2>Lợi Ích Của AI</h2>
          <p>AI giúp tăng năng suất, tự động hóa các nhiệm vụ lặp lại, và cung cấp insights từ dữ liệu lớn.</p>
        </section>
        <section>
          <h2>Lưu Ý Khi Sử Dụng AI</h2>
          <p>Hãy sử dụng AI một cách có trách nhiệm. Luôn kiểm tra tính chính xác của thông tin và tôn trọng quyền riêng tư.</p>
        </section>
        <section>
          <h2>Hỏi AI</h2>
          <p>Đặt câu hỏi về AI và nhận câu trả lời từ AI thực:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                background: loading ? '#999' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Đang xử lý...' : 'Hỏi'}
            </button>
          </div>
          {answer && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #667eea'
            }}>
              <strong>Câu trả lời từ AI:</strong>
              <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{answer}</p>
            </div>
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2026 Hướng Dẫn AI | <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener noreferrer">Tìm hiểu thêm về AI</a></p>
      </footer>
    </div>
  )
}

export default App
