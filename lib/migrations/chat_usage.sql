-- Create chat_usage table for tracking user interactions
CREATE TABLE IF NOT EXISTS chat_usage (
    user_id TEXT PRIMARY KEY,
    usage_count INTEGER NOT NULL DEFAULT 0,
    last_used TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on last_used for query performance
CREATE INDEX IF NOT EXISTS idx_chat_usage_last_used ON chat_usage(last_used);

-- Add comment to table
COMMENT ON TABLE chat_usage IS 'Tracks user interactions with the chat feature';

-- Add comments to columns
COMMENT ON COLUMN chat_usage.user_id IS 'Primary key - User email or ID';
COMMENT ON COLUMN chat_usage.usage_count IS 'Number of times user has used the chat feature';
COMMENT ON COLUMN chat_usage.last_used IS 'Timestamp of last chat interaction';
COMMENT ON COLUMN chat_usage.created_at IS 'Timestamp when user first used chat';