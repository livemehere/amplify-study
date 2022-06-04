# React + Amplify 풀 스택 서비스 만들기

[배포](https://dev.d23b6bb323wd0i.amplifyapp.com/)

## 시작 환경 세팅

```bash
# pc setting
npm install -g @aws-amplify/cli
amplify configure

# project setting
yarn create react-app <app이름> --template typescript
cd <app이름>
amplify init # react or react-native 를 위한 세팅하기 (혹은 자신에 맞는 프로젝트 세팅)
```

## client 세팅

### index.js

```tsx
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
```

## API 추가하기

```bash
amplify add api # GraphQL 선택 후 모델 수정
amplify push # 적용
```

> `src/graphql` 폴더가 생성 됩니다 (query, muatation, subscription 정의)

## API 테스트하기 

```bash
amplify console api # query, muatation 해볼 수 있음
```

## front-end 연결하기

> GraphQL API 를 생성하면 기본적으로 CRUD 와 Subscription이 생성된다.

```tsx
API.graphql(graphqlOperation(listTodos)); // GET
API.graphql(graphqlOperation(createTodo, { input: value })); // POST
API.graphql(graphqlOperation(onCreateTodo)).subscribe({ // Subscription (특정 query, mutation 을 listening)
    next: ({ provider, value }: any) => console.log(value),
    error: (error: any) => console.warn(error),
});
```

## 배포하기

```bash
amplify add hosting # setting
amplify publish
```

> [getting start](https://docs.amplify.aws/start/q/integration/react/)
