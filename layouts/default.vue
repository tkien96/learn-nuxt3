<template>
    <div class="container">
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
            <content-custom-html />
            <sidebar-wrapper />
            <div class="flex flex-col flex-1 w-full">
                <header-content-wrapper />
                <main class="h-full pb-16 overflow-y-auto">
                    <div class="container px-6 mx-auto grid">
                        <slot />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
