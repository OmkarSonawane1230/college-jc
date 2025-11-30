import { Rocket } from 'lucide-react';
import '../styles/API.css';

export default function API() {
  return (
    <div className="api-container">
      <div className="coming-soon-card">
        <div className="coming-soon-icon">
          <Rocket size={64} />
        </div>
        <h1 className="coming-soon-title">API (Academic Performance Index)</h1>
        <p className="coming-soon-description">
          We're working hard to bring you the Academic Performance Index feature. 
          This powerful tool will help you track and analyze academic metrics in new ways.
        </p>
        <div className="coming-soon-badge">Coming Soon</div>
      </div>
    </div>
  );
}
