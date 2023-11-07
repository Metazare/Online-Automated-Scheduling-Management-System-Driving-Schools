
/**
 * enrollmentId
 * lessonId
 * status
 */
router.patch('/progress', limitUsers(Role.ADMIN, Role.INSTRUCTOR), asynchronousHandler(updateProgress));
