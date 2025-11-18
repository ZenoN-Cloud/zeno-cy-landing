#!/usr/bin/env node

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.argv[2];

if (!NOTION_TOKEN) {
  console.error('❌ NOTION_TOKEN not found in environment');
  process.exit(1);
}

if (!DATABASE_ID) {
  console.error('❌ Usage: node scripts/setup-notion.js <database_id>');
  process.exit(1);
}

async function testNotionConnection() {
  try {
    console.log('🔍 Testing Notion connection...');
    
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const database = await response.json();
    console.log('✅ Connected to database:', database.title[0]?.plain_text || 'Untitled');
    
    // Test creating a sample entry
    console.log('📝 Creating test entry...');
    
    const testEntry = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          Email: { email: 'test@example.com' },
          'Company Size': { select: { name: '1-5' } },
          Banks: { multi_select: [{ name: 'Hellenic Bank' }] },
          'Feature Requests': { rich_text: [{ text: { content: 'Test request' } }] },
          'Submitted At': { date: { start: new Date().toISOString() } },
        },
      }),
    });

    if (testEntry.ok) {
      console.log('✅ Test entry created successfully!');
      console.log('🎉 Notion integration is working!');
    } else {
      console.error('❌ Failed to create test entry:', await testEntry.text());
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure you:');
    console.log('1. Created a database in Notion with the required columns');
    console.log('2. Shared the database with your integration');
    console.log('3. Used the correct database ID from the URL');
  }
}

testNotionConnection();