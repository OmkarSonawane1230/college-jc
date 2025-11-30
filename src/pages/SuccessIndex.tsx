import { useRef, useState } from 'react';
import { Upload, FileText, Users, TrendingUp, BookOpen, AlertCircle, ChevronDown } from 'lucide-react';
import '../styles/SuccessIndex.css';

interface PreviewData {
  totalStudents: number;
  maxMarks: number;
  studentsWithBacklogs: number;
  backlogStudentDetails: Array<{ enroll: string; name: string; subjects: number }>;
  averageMarks: number;
  passPercentage: number;
}

export default function SuccessIndex() {
  const [batchType, setBatchType] = useState<'new' | 'old'>('new');
  const [batchYear, setBatchYear] = useState('');
  const [semester, setSemester] = useState('');
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const [previousIndexFile, setPreviousIndexFile] = useState<File | null>(null);
  
  const [studentFile, setStudentFile] = useState<File | null>(null);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const studentFileRef = useRef<HTMLInputElement>(null);
  const resultFileRef = useRef<HTMLInputElement>(null);
  const previousIndexFileRef = useRef<HTMLInputElement>(null);

  const semesterOptions = [
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
  ];

  const handleStudentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentFile(file);
      console.log('Student file uploaded:', file.name);
    }
  };

  const handleResultFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResultFile(file);
      console.log('Result file uploaded:', file.name);
    }
  };

  const handlePreviousIndexFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviousIndexFile(file);
      console.log('Previous index file uploaded:', file.name);
    }
  };

  const handleRemoveStudentFile = () => {
    setStudentFile(null);
    if (studentFileRef.current) {
      studentFileRef.current.value = '';
    }
  };

  const handleRemoveResultFile = () => {
    setResultFile(null);
    if (resultFileRef.current) {
      resultFileRef.current.value = '';
    }
  };

  const handleRemovePreviousIndexFile = () => {
    setPreviousIndexFile(null);
    if (previousIndexFileRef.current) {
      previousIndexFileRef.current.value = '';
    }
  };

  const handleSemesterSelect = (value: string) => {
    setSemester(value);
    setSemesterDropdownOpen(false);
  };

  const handleProcessData = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock preview data - In real implementation, this will come from backend
    const mockPreviewData: PreviewData = {
      totalStudents: 120,
      maxMarks: 850,
      studentsWithBacklogs: 15,
      backlogStudentDetails: [
        { enroll: 'CS2021001', name: 'Rahul Sharma', subjects: 2 },
        { enroll: 'CS2021045', name: 'Priya Patel', subjects: 1 },
        { enroll: 'CS2021089', name: 'Amit Kumar', subjects: 3 },
      ],
      averageMarks: 645,
      passPercentage: 87.5,
    };
    
    setPreviewData(mockPreviewData);
    setShowPreview(true);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setShowPreview(false);
    setPreviewData(null);
  };

  return (
    <div className="success-index-container" data-testid="success-index-container">
      <div className="success-index-header">
        <h2 className="page-subtitle" data-testid="success-index-title">Success Index</h2>
        <p className="page-description">Upload student enrollment data and semester results to calculate success metrics</p>
      </div>

      {/* Batch Configuration Section */}
      <div className="batch-config-section">
        <h3 className="section-title">Batch Configuration</h3>
        
        {/* Batch Type Selection */}
        <div className="form-group">
          <label className="form-label">Batch Type *</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="batchType"
                value="new"
                checked={batchType === 'new'}
                onChange={(e) => setBatchType(e.target.value as 'new' | 'old')}
              />
              <span>New Batch (First Year)</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="batchType"
                value="old"
                checked={batchType === 'old'}
                onChange={(e) => setBatchType(e.target.value as 'new' | 'old')}
              />
              <span>Old Batch (Second/Third Year)</span>
            </label>
          </div>
        </div>

        {/* Common Fields */}
        <div className="form-row">
          {batchType === 'new' && (
            <div className="form-group">
              <label className="form-label">Batch Year *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., 2024"
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Current Semester *</label>
            <div className="custom-dropdown">
              <button
                className="dropdown-trigger"
                onClick={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
                type="button"
              >
                <span className={semester ? 'dropdown-value' : 'dropdown-placeholder'}>
                  {semester ? `Semester ${semester}` : 'Select Semester'}
                </span>
                <ChevronDown size={20} className={`dropdown-icon ${semesterDropdownOpen ? 'open' : ''}`} />
              </button>
              {semesterDropdownOpen && (
                <div className="dropdown-menu">
                  {semesterOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`dropdown-option ${semester === option.value ? 'selected' : ''}`}
                      onClick={() => handleSemesterSelect(option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="file-upload-section">
        <h3 className="section-title">Upload Files</h3>
        
        {/* Student Enrollment Data */}
        <div className="file-upload-row" data-testid="student-data-upload-card">
          <div className="file-upload-info">
            <FileText size={20} className="file-icon" />
            <span className="file-label">Student Enrollment Data</span>
          </div>
          {!studentFile ? (
            <button
              className="file-choose-button-inline"
              onClick={() => studentFileRef.current?.click()}
              data-testid="student-upload-button"
              type="button"
            >
              <Upload size={18} />
              <span>Choose File</span>
            </button>
          ) : (
            <div className="file-selected-inline" data-testid="student-file-selected">
              <span className="file-name">{studentFile.name}</span>
              <button
                className="remove-button-inline"
                onClick={handleRemoveStudentFile}
                data-testid="remove-student-file-button"
                type="button"
              >
                Remove
              </button>
            </div>
          )}
          <input
            ref={studentFileRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleStudentFileChange}
            style={{ display: 'none' }}
            data-testid="student-file-input"
          />
        </div>

        {/* Semester Results */}
        <div className="file-upload-row" data-testid="result-data-upload-card">
          <div className="file-upload-info">
            <FileText size={20} className="file-icon" />
            <span className="file-label">Semester Results</span>
          </div>
          {!resultFile ? (
            <button
              className="file-choose-button-inline"
              onClick={() => resultFileRef.current?.click()}
              data-testid="result-upload-button"
              type="button"
            >
              <Upload size={18} />
              <span>Choose File</span>
            </button>
          ) : (
            <div className="file-selected-inline" data-testid="result-file-selected">
              <span className="file-name">{resultFile.name}</span>
              <button
                className="remove-button-inline"
                onClick={handleRemoveResultFile}
                data-testid="remove-result-file-button"
                type="button"
              >
                Remove
              </button>
            </div>
          )}
          <input
            ref={resultFileRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleResultFileChange}
            style={{ display: 'none' }}
            data-testid="result-file-input"
          />
        </div>

        {/* Previous Success Index (Old Batch Only) */}
        {batchType === 'old' && (
          <div className="file-upload-row" data-testid="previous-index-upload-card">
            <div className="file-upload-info">
              <FileText size={20} className="file-icon" />
              <span className="file-label">Previous Success Index</span>
            </div>
            {!previousIndexFile ? (
              <button
                className="file-choose-button-inline"
                onClick={() => previousIndexFileRef.current?.click()}
                data-testid="previous-index-upload-button"
                type="button"
              >
                <Upload size={18} />
                <span>Choose File</span>
              </button>
            ) : (
              <div className="file-selected-inline" data-testid="previous-index-file-selected">
                <span className="file-name">{previousIndexFile.name}</span>
                <button
                  className="remove-button-inline"
                  onClick={handleRemovePreviousIndexFile}
                  data-testid="remove-previous-index-file-button"
                  type="button"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              ref={previousIndexFileRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handlePreviousIndexFileChange}
              style={{ display: 'none' }}
              data-testid="previous-index-file-input"
            />
          </div>
        )}
      </div>

      {/* Preview Section */}
      {showPreview && previewData && (
        <div className="preview-section">
          <div className="preview-header">
            <h3 className="preview-title">Data Preview</h3>
            <button className="reset-button" onClick={handleReset}>
              Start Over
            </button>
          </div>

          <div className="preview-stats">
            <div className="stat-card">
              <div className="stat-icon users">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Students</p>
                <p className="stat-value">{previewData.totalStudents}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon marks">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Maximum Marks</p>
                <p className="stat-value">{previewData.maxMarks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon average">
                <BookOpen size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Average Marks</p>
                <p className="stat-value">{previewData.averageMarks}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon percentage">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Pass Percentage</p>
                <p className="stat-value">{previewData.passPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Backlog Students */}
          {previewData.studentsWithBacklogs > 0 && (
            <div className="backlog-section">
              <div className="backlog-header">
                <AlertCircle size={20} />
                <h4>Students with Backlogs ({previewData.studentsWithBacklogs})</h4>
              </div>
              <p className="backlog-description">
                These students appeared for papers from different semesters
              </p>
              
              <div className="backlog-list">
                {previewData.backlogStudentDetails.map((student, index) => (
                  <div key={index} className="backlog-item">
                    <div className="backlog-student-info">
                      <span className="backlog-enroll">{student.enroll}</span>
                      <span className="backlog-name">{student.name}</span>
                    </div>
                    <span className="backlog-count">
                      {student.subjects} backlog subject{student.subjects > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
                {previewData.studentsWithBacklogs > 3 && (
                  <p className="backlog-more">
                    and {previewData.studentsWithBacklogs - 3} more students...
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="preview-actions">
            <button className="confirm-button">
              Confirm & Generate Success Index
            </button>
          </div>
        </div>
      )}

      {/* Action Footer */}
      {!showPreview && (
        <div className="action-footer">
          <button
            className="process-button"
            disabled={
              !studentFile || 
              !resultFile || 
              !semester || 
              (batchType === 'new' && !batchYear) ||
              (batchType === 'old' && !previousIndexFile) ||
              isProcessing
            }
            onClick={handleProcessData}
            data-testid="process-button"
          >
            {isProcessing ? 'Processing...' : 'Process Data'}
          </button>
          <p className="footer-note">
            {batchType === 'new' 
              ? 'Processing new batch - no previous records required' 
              : 'Previous success index will be used for comparison'}
          </p>
        </div>
      )}
    </div>
  );
}