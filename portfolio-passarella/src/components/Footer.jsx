export default function Footer() {
  return (
    <footer className="py-4 mt-5 border-top bg-body-tertiary">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="text-muted">© {new Date().getFullYear()} Shahul Hameed</span>
        <div className="d-flex gap-3">
          <a className="link-secondary" href="https://github.com/shahulhameed-dev" target="_blank" rel="noreferrer">GitHub</a>
          <a className="link-secondary" href="https://www.linkedin.com/in/shahul-hameed-badhusha-ansari" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}


