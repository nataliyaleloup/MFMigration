# Project replication

Use these resources in order to replicate the current project to another, cloned project. This process is meant to be done for projects that are forks of other, core projects (e.g. "HiPerMobile RWO" is a fork of "HiPerMobile"). The reason for this is to allow the fork to maintain the exact same folder structure as the parent project, while at the same time allowing it to be built and deployed (to devices and Worklight servers) as a new distinct app.

## Initial fork preparation

Once you fork a project the first thing you need to do is change certain basic information:
- Checkout the fork.
- Edit the JSONStore configuration properties in `config.json` (if applicable) to change (at least) the `JSONStore.userName` property. Keeping the same value would mean that the actual JSONStore used on-device would be the JSONStore of the core app.
- Edit your "X-env.properties" files to set the `replicateProject.target.name` to the forked app's identifier.
- Edit files `replicate.prebuild.paths` and `replicate.postbuild.paths` to set the paths correctly (and add any additional paths). Concerning these files:
-- File `replicate.prebuild.paths` contains resources that are copied **before** the resulting Worklight project is built.
-- File `replicate.postbuild.paths` contains resources that are copied **after** the resulting Worklight project is built.
-- When specifying a directory, an existing directory on the target side will be fully deleted and replaced by the source one.
-- When specifying a file it is copied over to the target but also any references of the initial app name in it are replaced by the new app name.

## Creating the runtime version of the fork

Creating the runtime version of the fork is done using the following steps:
1. On the command prompt change to the root project folder (where `build.xml` is located).
2. Execute with Ant the `replicate` target on `build.xml`.
3. Switch directory to the newly replicated project.
4. If this is the first time you are building this fork you will need to create its war file to be used with the Worklight server configuration tool. To create this war do `ant war`.
5. To build the native version of the fork you will need to import the replicated project in Eclipse (for an Android app) and in Eclipse/Xcode (for an iOS app). Building the native app is exactly the same from the replicated project as for a regular project.
 
**Important**
- Any changes in code or configuration you want to do should always be done on the **non-replicated** version of the fork (i.e. what you have in SCM).
- Whenever you build the war, apps, adapters and native apps, this must always be done from the **replicated** version of the fork. 