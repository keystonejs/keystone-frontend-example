# Keystone Frontend Example (Complete)

This is the completed branch for the keystone frontend example - if you are following the tutorial series, please check out `main`.

## Making Changes

Some but not all files on this branch should be kept identical with main. The logic is, the files you start with should be the same in both places, but the files you will add in the walkthrough shouldn't be in `main`.

Changes should be committed to `completed` and then ported over to `main`. Here is a git script that will do it as relevant:

```
git checkout main
git checkout completed .
git reset experiments.tsx next-env.d.ts src/pages package.json yarn.lock README.md keystone.ts
git clean experiments.tsx next-env.d.ts src/pages -f
git restore yarn.lock package.json README.md keystone.ts
```

The `keystone.ts` file is the only file that needs to be different between the two and changes there must be made manually
