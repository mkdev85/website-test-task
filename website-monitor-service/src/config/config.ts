import convict from 'convict';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the schema for your configuration
const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 6000,
    env: 'PORT'
  },
  redis: {
    host: {
      doc: 'Redis Host.',
      format: String,
      default: 'localhost',
      env: 'REDIS_HOST'
    },
    port: {
      doc: 'Redis Port.',
      format: 'port',
      default: 6379,
      env: 'REDIS_PORT'
    }
  },
  nodeEnv: {
    doc: 'The application environment.',
    format: ['development', 'production', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  jwt: {
    doc: 'JWT secret Key',
    format: String,
    default: "abcgsggsggs",
    env: 'JWT_SECRET'
  },
  database: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      env: 'POSTGRES_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'POSTGRES_PORT'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'mydatabase',
      env: 'POSTGRES_DB'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: 'user',
      env: 'POSTGRES_USER'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      env: 'POSTGRES_PASSWORD'
    }
  },
  monitorInterval: {
    doc: 'Website monitoring interval in milliseconds',
    format: 'int',
    default: 120000,
    env: 'MONITOR_INTERVAL'
  },
  randomWebsiteUpdateInterval: {
    doc: 'Update website status randomly every minute',
    format: 'int',
    default: 60000,
    env: 'RANDOM_WEBSITE_UPDATE_INTERVAL'
  }
});

// Load environment-dependent configuration
const env = config.get('nodeEnv');
config.loadFile(`./src/config/${env}.json`);

// Perform validation
config.validate({ allowed: 'strict' });

export default config;