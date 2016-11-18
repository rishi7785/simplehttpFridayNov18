namespace App {
    export class PostController {
        static $inject = ['$http', '$state'];

        private httpService;
        private stateService;

        public postList;
        public currentPost;
        public newPost;

        public title;
        public description;
        public author;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState
        ) {
            this.httpService = $http;
            this.stateService = $state;

            console.log ('- test: ', this.stateService);

            this.postList = [];
            this.newPost = {};

            this.getPostList ();
        }

        public getPostList () {
            console.log ('here');
            this.httpService ({
                url: '/posts',
                method: 'GET'
            })
            .success ((response) => {
                console.log ('Test data: ', response);
                this.postList = response;
            })
            .error ((response) => {
            });
        }

        public getPost (id) {
            console.log ('here');
            this.httpService ({
                url: '/posts',
                method: 'GET',
                params: {
                    id: id
                }
            })
            .success ((response) => {
                console.log ('Test data: ', response);
                // this.postList = response;
                this.currentPost = response [0];
            })
            .error ((response) => {
            });
        }

        public save () {
            console.log ('Data to save: ', this.title);

            this.httpService ({
                url: '/posts',
                method: 'POST',
                data: {
                    title: this.title,
                    description: this.description,
                    author: this.author
                }
            })
            .success ((response) => {
                console.log ('Test data: ', response);
            })
            .error ((response) => {
            });
        }

        public deletePost (id) {
            console.log ('Deleting Post: ' + id);

            this.httpService ({
                url: '/posts/' + id,
                method: 'DELETE'
            })
            .success ((response) => {
                console.log ('Object deleted.');
                console.log ('Test data: ', response);

                this.stateService.go ('home');
            })
            .error ((response) => {
            });
        }

        public editPost (postId) {
            console.log ('post id: ' + postId);

            this.stateService.go ('posts-edit',
                {
                    id: postId
                }
            );
        }
    }
}
