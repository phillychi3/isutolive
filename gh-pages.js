var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/username/yourproject.git', // Update to point to your repository  
        user: {
            name: 'phillychi3', // update to use your name
            email: 'phillychi3@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)