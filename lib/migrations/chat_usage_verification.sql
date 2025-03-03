-- Add verification_count column to chat_usage table
ALTER TABLE chat_usage
ADD COLUMN verification_count INTEGER DEFAULT 0;

-- Update existing rows to have default verification count
UPDATE chat_usage
SET verification_count = 0
WHERE verification_count IS NULL;