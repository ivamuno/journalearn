const example = {
  APP: {
    HOME: 'Home',
    NEW: 'New',
    LIST: 'My Journals',
    REVIEW: 'Reviews',
    LOGIN: 'Log in',
    LOGOUT: 'Log out',
  },
  HOME: {
    TITLE: 'The most effective way to learn writing in another language',
    SUBTITLE:
      'Take a while to write about your experiences and feelings. Do not waste your time over-thinking, use the most common vocabulary which you use daily basis. Then, share to obtain reviews from natives and learn.',
    WRITE: {
      TITLE: 'Write',
      DESCRIPTION: 'These are some of the benefits which you can get from writing about your livings in another language:',
      LI1: 'Practice with the verbal tense. What did I do yesterday?, What have I done today?, What will I do tomorrow?',
      LI2: 'Learn some new words which you uses normally.',
      LI3: 'You do not need previous preparation to start writing.',
    },
    REVIEW: {
      TITLE: 'Reviews',
      BLOCK1:
        'No excuses, no fears, forget what you do not know. You do not need neither wasting your time searching in the dictionary nor reviewing if what you write is ok or not, a native person will do that for you! In that way you will not feel frustrated because of your lack of knowledge and the writing will be more fluent.',
      BLOCK2: 'Collaborate and take part of the community reviewing journals in your own language.',
      BLOCK3: 'Remember, whatever your write is public. You set the limits, if you are worried about privacy then you should not write about it.',
    },
    LEARN: {
      TITLE: 'Learn',
      BLOCK1: 'Have a look at the reviews to complete the learning and improve you skills day by day.',
      BLOCK2: 'Be humble and embrace corrections/advises, this is the best help you can have when your are learning.',
    },
  },
  LANGUAGE: {
    TITLE: 'Choose your language',
  },
  NEW: {
    TITLE: 'New Journal',
    EXAMPLE: 'Example: "Hoy yo [drank] <u>café con leche</u> [with a] amigo."',
    FIELDS: {
      AUTHOR: 'Author',
      LANGUAGE: 'Language',
      CHOOSE_LANGUAGE: 'Choose your language',
      TITLE: 'Title',
      TEXT: 'Text',
      SAVE: 'Save',
      RESET: 'Reset',
    },
    RULES: {
      TITLE: 'Rules',
      RULE1: 'Underline words and expressions which you searched in a dictionary.',
      RULE2: "Use brackets '[]' to include words and expressions in your own language.",
    },
    MESSAGES: {
      SUCCESS: 'The journal has been saved successfully!',
      ERROR: 'An error occurred creating the journal',
    },
  },
  REVIEW: {
    TITLE: 'Review Journal',
    EXAMPLE: 'Example: "Hoy yo [drank] <u>café con leche</u> [with a] <strike>amijo</strike>{amigo}."',
    FIELDS: {
      AUTHOR: 'Author',
      LANGUAGE: 'Language',
      DATE: 'Date',
      TITLE: 'Title',
      TEXT: 'Text',
      SAVE: 'Save',
      RESET: 'Reset',
    },
    RULES: {
      TITLE: 'Rules',
      RULE1: 'Strike incorrect words and expressions and indicate within curly brackets your review.',
    },
    MESSAGES: {
      SUCCESS: 'The review has been saved successfully!',
      ERROR_LOADING: 'An error occurred getting the journal',
      ERROR_SAVING: 'An error occurred saving the journal',
    },
  },
  VIEW: {
    TITLE: 'View Journal',
    FIELDS: {
      AUTHOR: 'Author',
      LANGUAGE: 'Language',
      DATE: 'Date',
      TITLE: 'Title',
      ORIGINAL: 'Original',
      REVIEW: 'Review',
    },
    MESSAGES: {
      ERROR: 'An error occurred getting the journal',
    },
  },
  MY_LIST: {
    TITLE: 'My Journals',
    SUBTITLE: 'Here you have your journal history.',
    FIELDS: {
      AUTHOR: 'Author',
      LANGUAGE: 'Language',
      DATE: 'Date',
      TITLE: 'Title',
      STATUS: 'Status',
      ACTIONS: 'Actions',
      VIEW: 'View',
    },
    MESSAGES: {
      ERROR: 'An error occurred getting the journals',
    },
  },
  REVIEW_LIST: {
    TITLE: 'Reviews',
    SUBTITLE: 'Here you have a list with pending reviews.',
    FIELDS: {
      AUTHOR: 'Author',
      LANGUAGE: 'Language',
      DATE: 'Date',
      TITLE: 'Title',
      STATUS: 'Status',
      ACTIONS: 'Actions',
      REVIEW: 'Review',
    },
    MESSAGES: {
      ERROR: 'An error occurred getting the journals',
    },
  },
  PROFILE: {
    TITLE: 'Profile',
    SUBTITLE: 'Information about yourself.',
    TITLE_BASIC: 'Basic Information',
    TITLE_LANGUAGE: 'Language Preferences',
    FIELDS: {
      FIRST_NAME: 'First Name',
      LAST_NAME: 'Last Name',
      DESCRIPTION: 'Description',
      LANGUAGE_NATIVE: 'Native Language',
      LANGUAGE_WRITE: 'Default Language for journal',
      CHOOSE_LANGUAGE: 'Choose your language',
      SAVE: 'Save',
      RESET: 'Reset',
    },
    MESSAGES: {
      ERROR: 'An error occurred saving the profile',
      SUCCESS: 'The profile has been saved successfully!',
    },
  },
  FORM: {
    ERRORS: {
      REQUIRED: 'Required.',
      MINLENGTH: 'Must be at least {{value}} characters long.',
      MAXLENGTH: 'Must be at most {{value}} characters long.',
    },
  },
};

function getPath(path: string, next: any) {
  Object.entries(next).forEach((entry) => {
    const newPath = `${path}.${entry[0]}`;
    if (typeof entry[1] == 'object') {
      getPath(newPath, entry[1]);
      return;
    }

    next[entry[0]] = newPath.substring(1);
  });

  return next;
}

export const i18nKeys: typeof example = getPath('', JSON.parse(JSON.stringify(example)));
console.log('i18nKeys', i18nKeys);
