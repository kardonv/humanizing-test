## Questions and answers

### Architecture

1. What software architecture would you evaluate and suggest?
    I would suggest to use microservices architecture. Because in this approach we have
        - Small and independed services
        - Each service should solve one issue
        - Loosely coupled - changes to one service do not affect the other

2. What are the key advantages and potential down-sides of your suggestions?
    Advantages:
        - A clear division into modules. It will always be clear how this or that part of the code works. Just add new features.
        - High availability. If any part of the monolith breaks, the entire application breaks. It is different with microservices: not all services may work (not critical, such as authorization), but the application will remain available at the same time.
        - Various technologies. As you design each service, you are free to choose the tools that best fit the specific business logic in that service. For example, choose the optimal database and convenient tools for working with it. Microservice architecture also allows you to try some new technology on a separate service without rewriting the entire application.
        - Relative ease of deployment. Each service rises on its own, which makes the deployment and debugging process cleaner.
    Disadvantages:
        - Complexity of development. If you need a quick solution (prototype, small application, tight deadline), then microservices are not for you. Development speed - high price for availability and modularity.
        - Complexity of support. Each microservice needs a separate maintenance, so constant automatic monitoring is needed.

3. Please provide a quick draft / layout of the concept?

### Development

1. What tools and software packages would you suggest? Please provide a reason /short explanation for your suggestions.
    - Node.js
    - Docker
    - AWS

2. How would you define and ensure code quality?

    To provide code quality I would suggest to follow the next points:
    * Use relevant coding standards
    * Analyze the code before a code review
    * Follow code review best practices
    * Refactor code when necessary

### Deployment

1. What deployment strategies would you suggest?

    It depends on our aims. 
    I would suggest to use A/B testing or canary deployment. 

2. How are your suggestions holding up regarding HA, scaling and maintainability?

## Practice
