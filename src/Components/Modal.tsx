import React from 'react';

export default function Modal({ isOpen, onClose, children, showClose = true }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showClose?: boolean;
}) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 999,
                }}
            />
            {/* Modal content */}
            <div
                role="dialog"
                aria-modal="true"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--color-bg)',
                    padding: '1.5rem 2.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    minWidth: '300px',
                }}
            >
                {showClose &&
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            color: 'var(--color-fg)'
                        }}
                    >
                        ×
                    </button>
                }
                {children}
            </div>
        </>
    );
}
