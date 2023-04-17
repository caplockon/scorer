<template>
    <slot name="starting"></slot>
    <header>
        <!-- We want header content here -->
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <!-- We want footer content here -->
    </footer>
    <slot name="ending"></slot>
</template>